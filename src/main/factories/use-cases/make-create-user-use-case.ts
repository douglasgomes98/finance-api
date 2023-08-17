import { CreateUserUseCase } from '@/data/use-cases/create-user-use-case';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { ZodCreateUserValidatorAdapter } from '@/infra/validators/zod/zod-create-user-validator-adapter';

export function makeCreateUserUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const zodCreateUserValidatorAdapter = new ZodCreateUserValidatorAdapter();
  const useCase = new CreateUserUseCase(
    prismaUserRepositoryAdapter,
    prismaUserRepositoryAdapter,
    bcryptAdapter,
    zodCreateUserValidatorAdapter,
  );

  return useCase;
}
