import { FastifyReply, FastifyRequest } from 'fastify';
import { ContainerInstance } from 'typedi';

export type ApolloContext = {
  requestId: string;
  container: ContainerInstance;
  request: FastifyRequest;
  response: FastifyReply;
  userId: string;
};
