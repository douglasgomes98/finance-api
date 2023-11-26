import { DeleteCategoryUseCase } from '@/data/use-cases/delete-category-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { ZodDeleteCategoryValidatorAdapter } from '@/infra/validators/zod/zod-delete-category-validator-adapter';

import { makeFindCategoryByIdUseCase } from './make-find-category-by-id-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeDeleteCategoryUseCase() {
  const findCategoryByIdUseCase = makeFindCategoryByIdUseCase();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const zodDeleteCategoryValidatorAdapter =
    new ZodDeleteCategoryValidatorAdapter();
  const useCase = new DeleteCategoryUseCase(
    findCategoryByIdUseCase,
    prismaCategoryRepositoryAdapter,
    findUserByIdUseCase,
    zodDeleteCategoryValidatorAdapter,
  );

  return useCase;
}
