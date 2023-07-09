import { FastifyReply } from "fastify";

export const updatedResponse =
  <T = any>(reply: FastifyReply) =>
  (data: T) =>
    reply.status(200).send(data);
