import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { ListCategoryUseCase } from '@/data/use-cases/list-category-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';
import { ZodListCategoryValidatorAdapter } from '@/infra/validators/zod/zod-list-category-validator-adapter';

export function makeListCategoryUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const zodListCategoryValidatorAdapter = new ZodListCategoryValidatorAdapter();
  const useCase = new ListCategoryUseCase(
    findUserByIdUseCase,
    prismaCategoryRepositoryAdapter,
    zodListCategoryValidatorAdapter,
  );

  return useCase;
}
