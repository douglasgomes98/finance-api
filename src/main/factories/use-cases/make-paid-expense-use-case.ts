import { PaidExpenseUseCase } from '@/data/use-cases/paid-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodPaidExpenseValidatorAdapter } from '@/infra/validators/zod/zod-paid-expense-validator-adapter';

export function makePaidExpenseUseCase() {
  const zodPaidExpenseValidatorAdapter = new ZodPaidExpenseValidatorAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const useCase = new PaidExpenseUseCase(
    zodPaidExpenseValidatorAdapter,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
  );

  return useCase;
}
