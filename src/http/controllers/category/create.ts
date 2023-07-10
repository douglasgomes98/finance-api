import { FastifyReply, FastifyRequest } from "fastify";
import { createValidator } from "./validators/create-validator";
import { createdResponse } from "@/http/responses/created-response";
import { makeCreateCategoryUseCase } from "@/use-cases/factories/make-create-category-use-case";
import { CategoryAlreadyExistsError } from "@/use-cases/errors/category-already-exists-error";
import { conflictResponse } from "@/http/responses/conflict-response";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, color } = createValidator.parse(request.body);

  const createCategoryUseCase = makeCreateCategoryUseCase();

  try {
    const newCategory = await createCategoryUseCase.execute({ name, color });

    return createdResponse(reply)(newCategory);
  } catch (error) {
    if (error instanceof CategoryAlreadyExistsError) {
      return conflictResponse(reply)({
        message: error.message,
      });
    }

    throw error;
  }
}
