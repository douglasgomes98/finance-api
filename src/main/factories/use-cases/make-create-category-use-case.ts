import { CreateCategoryUseCase } from '@/data/use-cases/create-category-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeCreateCategoryUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const useCase = new CreateCategoryUseCase(
    prismaCategoryRepositoryAdapter,
    prismaCategoryRepositoryAdapter,
    findUserByIdUseCase,
  );

  return useCase;
}
