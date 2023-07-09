import { FastifyReply } from "fastify";

export const badResponse =
  <T>(reply: FastifyReply) =>
  (data: T) =>
    reply.status(400).send(data);
