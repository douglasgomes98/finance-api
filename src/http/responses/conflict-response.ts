import { FastifyReply } from "fastify";

export const conflictResponse =
  <T>(reply: FastifyReply) =>
  (data: T) =>
    reply.status(409).send(data);
