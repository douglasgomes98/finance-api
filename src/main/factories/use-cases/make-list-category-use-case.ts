import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { ListCategoryUseCase } from '@/data/use-cases/list-category-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeListCategoryUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const useCase = new ListCategoryUseCase(
    findUserByIdUseCase,
    prismaCategoryRepositoryAdapter,
  );

  return useCase;
}
