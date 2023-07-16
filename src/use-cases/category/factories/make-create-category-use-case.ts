import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository';

import { CreateCategoryUseCase } from '../create-category';

export function makeCreateCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const useCase = new CreateCategoryUseCase(categoryRepository);

  return useCase;
}
