import { FastifyReply, FastifyRequest } from "fastify";
import { createValidator } from "./validators/create-validator";
import { createdResponse } from "@/http/responses/created-response";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, color } = createValidator.parse(request.body);

  return createdResponse(reply)({ name, color });
}
