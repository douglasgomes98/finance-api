import { FastifyReply, FastifyRequest } from 'fastify';
import Container from 'typedi';

import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { UserTokenModel } from '@/domain/entities/user-token-model';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter';

import { ApolloContext } from './types';

async function getUserByRequest(
  request: FastifyRequest,
): Promise<UserTokenModel | null> {
  const token = request.headers.authorization;
  const [, tokenValue] = token?.split(' ') ?? [];

  const jwtAdapter = new JwtAdapter();

  const isValid = await jwtAdapter.verify(tokenValue);

  if (isValid) {
    return jwtAdapter.decrypt(tokenValue);
  }

  return null;
}

export async function makeContext(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<ApolloContext> {
  const bcryptAdapter = new BcryptAdapter();
  const requestId = await bcryptAdapter.createId();
  const container = Container.of(requestId.toString());
  const user = await getUserByRequest(request);
  reply.header('transaction-id', requestId);

  return {
    requestId,
    container,
    request,
    response: reply,
    user,
  };
}
