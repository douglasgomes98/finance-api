import { CreateCategoryUseCase } from '@/data/use-cases/create-category-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { ZodCreateCategoryValidatorAdapter } from '@/infra/validators/zod/zod-create-category-validator-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';

export function makeCreateCategoryUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const formatterAdapter = new FormatterAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
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
