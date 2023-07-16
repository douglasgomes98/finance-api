import { FastifyReply } from 'fastify';

export const unauthorizedResponse =
  <T>(reply: FastifyReply) =>
  (data: T) =>
    reply.status(401).send(data);
