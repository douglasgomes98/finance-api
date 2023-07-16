import { normalizeName } from "@/helpers/normalize-name";
import { conflictResponse } from "@/http/responses/conflict-response";
import { createdResponse } from "@/http/responses/created-response";
import { UserAlreadyExistsError } from "@/use-cases/user/errors/user-already-exists-error";
import { makeCreateUserUseCase } from "@/use-cases/user/factories/make-create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createValidator = z.object({
  name: z.string().transform((value) => normalizeName(value)),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = createValidator.parse(request.body);

  const createUserUseCase = makeCreateUserUseCase();

  try {
    const newUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return createdResponse(reply)(newUser);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return conflictResponse(reply)({
        message: error.message,
      });
    }

    throw error;
  }
}
