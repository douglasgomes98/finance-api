import 'reflect-metadata';
import './configurations/imports';
import fastify from 'fastify';
import { ResolverData, buildSchema } from 'type-graphql';
import Container from 'typedi';
import { ZodError } from 'zod';

import { ApolloContext } from '@/presentation/graphql/types';
import {
  ApolloServer,
  ApolloServerPlugin,
  GraphQLRequestContext,
} from '@apollo/server';
import { unwrapResolverError } from '@apollo/server/errors';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import cors from '@fastify/cors';

import { BcryptAdapter } from '../infra/cryptography/bcrypt-adapter';
import { resolvers } from '../presentation/graphql/resolvers';
import { ENV } from './configurations/environment';

export async function bootstrap() {
  const app = fastify();

  app.register(cors);

  app.get('/', async (_, reply) => reply.redirect('/graphql'));

  const schema = await buildSchema({
    emitSchemaFile: true,
    resolvers,
    container: ({ context }: ResolverData<ApolloContext>) => context.container,
  });

  const apollo = new ApolloServer<ApolloContext>({
    introspection: true,
    schema,
    formatError(formattedError, error) {
      if (unwrapResolverError(error) instanceof ZodError) {
        return {
          ...formattedError,
          message: 'Validation error.',
          extensions: {
            issues: JSON.parse(formattedError.message),
          },
        };
      }

      return formattedError;
    },
    plugins: [
      fastifyApolloDrainPlugin(app),
      {
        requestDidStart: () => ({
          willSendResponse(
            requestContext: GraphQLRequestContext<ApolloContext>,
          ) {
            Container.remove(requestContext.contextValue.requestId.toString());
          },
        }),
      } as unknown as ApolloServerPlugin<ApolloContext>,
    ],
  });

  await apollo.start();

  await app.register(fastifyApollo(apollo), {
    context: async (request, reply) => {
      const bcryptAdapter = new BcryptAdapter();
      const requestId = await bcryptAdapter.createId();
      const container = Container.of(requestId.toString());

      reply.header('transaction-id', requestId);

      const context: ApolloContext = {
        requestId,
        container,
        request,
        response: reply,
        userId: '6971db02-0089-4845-9862-fa9f9d1886ae',
      };

      return context;
    },
  });

  await app
    .listen({
      host: '0.0.0.0',
      port: ENV.PORT,
    })
    .then(() => {
      console.log(`Server running at http://localhost:${ENV.PORT}`);
    });
}
