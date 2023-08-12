import { DeleteCategoryUseCase } from '@/data/use-cases/delete-category-use-case';
import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeDeleteCategoryUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    prismaCategoryRepositoryAdapter,
  );
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const useCase = new DeleteCategoryUseCase(
    findCategoryByIdUseCase,
    prismaCategoryRepositoryAdapter,
    findUserByIdUseCase,
  );

  return useCase;
}
