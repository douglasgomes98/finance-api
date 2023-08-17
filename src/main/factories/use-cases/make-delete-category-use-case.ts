import { DeleteCategoryUseCase } from '@/data/use-cases/delete-category-use-case';
import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { ZodDeleteCategoryValidatorAdapter } from '@/infra/validators/zod/zod-delete-category-validator-adapter';
import { ZodFindCategoryByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-category-by-id-validator-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';

export function makeDeleteCategoryUseCase() {
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
