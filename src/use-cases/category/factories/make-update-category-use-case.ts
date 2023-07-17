import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository';

import { FindCategoryByIdUseCase } from '../find-category-by-id';
import { UpdateCategoryUseCase } from '../update-category';

export function makeUpdateCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    categoryRepository,
  );
  const useCase = new UpdateCategoryUseCase(
    findCategoryByIdUseCase,
    categoryRepository,
  );

  return useCase;
}
