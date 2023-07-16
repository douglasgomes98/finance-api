import { FastifyReply } from 'fastify';

export const createdResponse =
  <T>(reply: FastifyReply) =>
  (data: T) =>
    reply.status(201).send(data);
