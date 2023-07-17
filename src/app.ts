import 'reflect-metadata';
import './configurations/imports';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { ResolverData, buildSchema } from 'type-graphql';
import Container, { ContainerInstance } from 'typedi';
import { ZodError } from 'zod';

import { unwrapResolverError } from '@apollo/server/errors';
import {
  ApolloServer,
  ApolloServerPlugin,
  GraphQLRequestContext,
} from '@apollo/server';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';

import { ENV } from './configurations/environment';
import { generateId } from './helpers/generate-id';
import { resolvers } from './http/resolvers';

export type ApolloContext = {
  requestId: string;
  container: ContainerInstance;
  request: FastifyRequest;
  response: FastifyReply;
};

export async function bootstrap() {
  const app = fastify();

  app.get('/', async (_, reply) => reply.redirect('/graphql'));

  const schema = await buildSchema({
    emitSchemaFile: true,
    resolvers,
    container: ({ context }: ResolverData<ApolloContext>) => context.container,
  });

  const apollo = new ApolloServer<ApolloContext>({
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
      const requestId = generateId();
      const container = Container.of(requestId.toString());

      reply.header('transaction-id', requestId);

      const context: ApolloContext = {
        requestId,
        container,
        request,
        response: reply,
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
