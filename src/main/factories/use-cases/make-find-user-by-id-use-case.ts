import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeFindUserByIdUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const useCase = new FindUserByIdUseCase(prismaUserRepositoryAdapter);

  return useCase;
}
