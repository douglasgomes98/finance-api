import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository';

import { DeleteCategoryUseCase } from '../delete-category';
import { FindCategoryByIdUseCase } from '../find-category-by-id';

export function makeDeleteCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    categoryRepository,
  );
  const useCase = new DeleteCategoryUseCase(
    findCategoryByIdUseCase,
    categoryRepository,
  );

  return useCase;
}
