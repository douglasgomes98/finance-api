import { FindExpenseByIdUseCase } from '@/data/use-cases/find-expense-by-id-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodFindExpenseByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-expense-by-id-validator-adapter';

export function makeFindExpenseByIdUseCase() {
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodFindExpenseByIdValidatorAdapter =
    new ZodFindExpenseByIdValidatorAdapter();
  const useCase = new FindExpenseByIdUseCase(
    prismaExpenseRepositoryAdapter,
    zodFindExpenseByIdValidatorAdapter,
  );

  return useCase;
}
