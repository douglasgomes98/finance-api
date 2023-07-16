import { FastifyReply } from 'fastify';

export const okResponse =
  <T>(reply: FastifyReply) =>
  (data: T) =>
    reply.status(200).send(data);
