import { FastifyReply } from "fastify";

export const createdResponse =
  <T = any>(reply: FastifyReply) =>
  (data: T) =>
    reply.status(201).send(data);
