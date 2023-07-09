import { FastifyReply, FastifyRequest } from "fastify";
import { unauthorizedResponse } from "../responses/unauthorized-response";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return unauthorizedResponse(reply);
  }
}
