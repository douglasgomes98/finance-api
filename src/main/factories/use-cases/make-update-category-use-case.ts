import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id';
import { UpdateCategoryUseCase } from '@/data/use-cases/update-category';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeUpdateCategoryUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    prismaCategoryRepositoryAdapter,
  );
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const useCase = new UpdateCategoryUseCase(
    findCategoryByIdUseCase,
    prismaCategoryRepositoryAdapter,
    prismaCategoryRepositoryAdapter,
    findUserByIdUseCase,
  );

  return useCase;
}
