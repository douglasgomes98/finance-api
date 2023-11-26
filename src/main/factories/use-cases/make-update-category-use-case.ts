import { UpdateCategoryUseCase } from '@/data/use-cases/update-category-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { ZodUpdateCategoryValidatorAdapter } from '@/infra/validators/zod/zod-update-category-validator-adapter';

import { makeFindCategoryByIdUseCase } from './make-find-category-by-id-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeUpdateCategoryUseCase() {
  const findCategoryByIdUseCase = makeFindCategoryByIdUseCase();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const formatterAdapter = new FormatterAdapter();
  const zodUpdateCategoryValidatorAdapter =
    new ZodUpdateCategoryValidatorAdapter(formatterAdapter);
  const useCase = new UpdateCategoryUseCase(
    findCategoryByIdUseCase,
    prismaCategoryRepositoryAdapter,
    prismaCategoryRepositoryAdapter,
    findUserByIdUseCase,
    zodUpdateCategoryValidatorAdapter,
  );

  return useCase;
}
