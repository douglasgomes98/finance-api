import { FastifyReply, FastifyRequest } from "fastify";
import { updateValidator } from "./validators/update-validator";
import { updatedResponse } from "@/http/responses/updated-response";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { name, color } = updateValidator.parse(request.body);

  console.log({ name, color });

  return updatedResponse(reply)({ name, color });
}
