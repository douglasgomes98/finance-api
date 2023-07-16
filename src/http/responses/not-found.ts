import { FastifyReply } from 'fastify';

export const notFound =
  <T>(reply: FastifyReply) =>
  (data: T) =>
    reply.status(404).send(data);
