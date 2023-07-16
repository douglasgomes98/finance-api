import { FastifyReply, FastifyRequest } from "fastify";
import { createdResponse } from "@/http/responses/created-response";
import { makeCreateCategoryUseCase } from "@/use-cases/category/factories/make-create-category-use-case";
import { CategoryAlreadyExistsError } from "@/use-cases/category/errors/category-already-exists-error";
import { conflictResponse } from "@/http/responses/conflict-response";
import { z } from "zod";
import { normalizeName } from "@/helpers/normalize-name";

export const createValidator = z.object({
  name: z.string().transform((value) => normalizeName(value)),
  color: z
    .string()
    .length(7)
    .regex(/^#[0-9a-f]{6}$/i),
});

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
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
