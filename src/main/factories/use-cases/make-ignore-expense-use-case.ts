import { IgnoreExpenseUseCase } from '@/data/use-cases/ignore-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodIgnoreExpenseValidatorAdapter } from '@/infra/validators/zod/zod-ignore-expense-validator-adapter';

export function makeIgnoreExpenseUseCase() {
  const zodIgnoreExpenseValidatorAdapter =
    new ZodIgnoreExpenseValidatorAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const useCase = new IgnoreExpenseUseCase(
    zodIgnoreExpenseValidatorAdapter,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
  );

  return useCase;
}
