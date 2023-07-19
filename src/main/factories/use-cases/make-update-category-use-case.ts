import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id';
import { UpdateCategoryUseCase } from '@/data/use-cases/update-category';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';

export function makeUpdateCategoryUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    prismaCategoryRepositoryAdapter,
  );
  const useCase = new UpdateCategoryUseCase(
    findCategoryByIdUseCase,
    prismaCategoryRepositoryAdapter,
    prismaCategoryRepositoryAdapter,
  );

  return useCase;
}
