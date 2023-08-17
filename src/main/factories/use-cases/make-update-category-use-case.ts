import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { UpdateCategoryUseCase } from '@/data/use-cases/update-category-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { ZodFindCategoryByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-category-by-id-validator-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';
import { ZodUpdateCategoryValidatorAdapter } from '@/infra/validators/zod/zod-update-category-validator-adapter';

export function makeUpdateCategoryUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const zodFindCategoryByIdValidatorAdapter =
    new ZodFindCategoryByIdValidatorAdapter();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    prismaCategoryRepositoryAdapter,
    zodFindCategoryByIdValidatorAdapter,
  );
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
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
