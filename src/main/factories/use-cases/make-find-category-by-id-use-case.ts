import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { ZodFindCategoryByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-category-by-id-validator-adapter';

export function makeFindCategoryByIdUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const zodFindCategoryByIdValidatorAdapter =
    new ZodFindCategoryByIdValidatorAdapter();
  const useCase = new FindCategoryByIdUseCase(
    prismaCategoryRepositoryAdapter,
    zodFindCategoryByIdValidatorAdapter,
  );

  return useCase;
}
