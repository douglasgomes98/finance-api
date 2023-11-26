import { CreateCategoryUseCase } from '@/data/use-cases/create-category-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { ZodCreateCategoryValidatorAdapter } from '@/infra/validators/zod/zod-create-category-validator-adapter';

import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeCreateCategoryUseCase() {
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const formatterAdapter = new FormatterAdapter();
  const zodCreateCategoryValidatorAdapter =
    new ZodCreateCategoryValidatorAdapter(formatterAdapter);
  const useCase = new CreateCategoryUseCase(
    prismaCategoryRepositoryAdapter,
    prismaCategoryRepositoryAdapter,
    findUserByIdUseCase,
    zodCreateCategoryValidatorAdapter,
  );

  return useCase;
}
