import { FastifyReply } from "fastify";

export const unauthorizedResponse = (reply: FastifyReply) =>
  reply.status(401).send({ message: "Unauthorized." });
