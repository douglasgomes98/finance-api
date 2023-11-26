import { FastifyReply, FastifyRequest } from 'fastify';
import { ContainerInstance } from 'typedi';

import { UserTokenModel } from '@/domain/entities/user-token-model';

export type ApolloContext = {
  requestId: string;
  container: ContainerInstance;
  request: FastifyRequest;
  response: FastifyReply;
  user: UserTokenModel | null;
};
