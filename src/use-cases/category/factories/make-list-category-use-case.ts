import { FindUserByIdUseCase } from '@/use-cases/user/find-user-by-id';
import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';

import { ListCategoryUseCase } from '../list-category';

export function makeListCategoryUseCase() {
  const userRepository = new PrismaUserRepository();
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
  const categoryRepository = new PrismaCategoryRepository();
  const useCase = new ListCategoryUseCase(
    findUserByIdUseCase,
    categoryRepository,
  );

  return useCase;
}
