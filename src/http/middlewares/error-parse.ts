import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { internalServerErrorResponse } from "../responses/internal-server-error-response";
import { ENV } from "@/environment";
import { ZodError } from "zod";
import { badResponse } from "../responses/bad-response";

export const errorParse = (
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

  if (ENV.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return internalServerErrorResponse(reply);
};