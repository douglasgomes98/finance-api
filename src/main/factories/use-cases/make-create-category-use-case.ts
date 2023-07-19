import { CreateCategoryUseCase } from '@/data/use-cases/create-category';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';

export function makeCreateCategoryUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const useCase = new CreateCategoryUseCase(
    prismaCategoryRepositoryAdapter,
    prismaCategoryRepositoryAdapter,
  );

  return useCase;
}
