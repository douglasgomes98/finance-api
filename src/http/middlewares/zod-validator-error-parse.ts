import { ZodError } from "zod";
import { badResponse } from "../responses/bad-response";
import { internalServerErrorResponse } from "../responses/internal-server-error-response";
import { FastifyReply, FastifyRequest, FastifyError } from "fastify";

export const zodValidatorErrorParse = (
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ZodError) {
    return badResponse(reply)({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  return internalServerErrorResponse(reply);
};
