import { ListCategoryUseCase } from '@/data/use-cases/list-category-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { ZodListCategoryValidatorAdapter } from '@/infra/validators/zod/zod-list-category-validator-adapter';

import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeListCategoryUseCase() {
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const zodListCategoryValidatorAdapter = new ZodListCategoryValidatorAdapter();
  const useCase = new ListCategoryUseCase(
    findUserByIdUseCase,
    prismaCategoryRepositoryAdapter,
    zodListCategoryValidatorAdapter,
  );

  return useCase;
}
