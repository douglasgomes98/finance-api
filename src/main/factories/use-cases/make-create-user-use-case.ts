import { CreateUserUseCase } from '@/data/use-cases/create-user';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeCreateUserUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const useCase = new CreateUserUseCase(
    prismaUserRepositoryAdapter,
    prismaUserRepositoryAdapter,
    bcryptAdapter,
  );

  return useCase;
}
