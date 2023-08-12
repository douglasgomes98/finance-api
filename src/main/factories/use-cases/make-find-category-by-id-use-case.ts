import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';

export function makeFindCategoryByIdUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const useCase = new FindCategoryByIdUseCase(prismaCategoryRepositoryAdapter);

  return useCase;
}
