import { DeleteCategoryUseCase } from '@/data/use-cases/delete-category';
import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';

export function makeDeleteCategoryUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    prismaCategoryRepositoryAdapter,
  );
  const useCase = new DeleteCategoryUseCase(
    findCategoryByIdUseCase,
    prismaCategoryRepositoryAdapter,
  );

  return useCase;
}
