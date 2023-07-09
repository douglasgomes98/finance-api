import { FastifyReply } from "fastify";

export const internalServerErrorResponse = (reply: FastifyReply) =>
  reply.status(500).send({ message: "Internal server error." });
