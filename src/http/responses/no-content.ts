import { FastifyReply } from 'fastify';

export const noContent = (reply: FastifyReply) => reply.status(204).send();
