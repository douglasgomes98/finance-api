import { PaidExpenseUseCase } from '@/data/use-cases/paid-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodPaidExpenseValidatorAdapter } from '@/infra/validators/zod/zod-paid-expense-validator-adapter';

import { makeUpdateCreditCardLimitUseCase } from './make-update-credit-card-limit-use-case';

export function makePaidExpenseUseCase() {
  const zodPaidExpenseValidatorAdapter = new ZodPaidExpenseValidatorAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const updateCreditCardLimitUseCase = makeUpdateCreditCardLimitUseCase();
  const useCase = new PaidExpenseUseCase(
    zodPaidExpenseValidatorAdapter,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    updateCreditCardLimitUseCase,
  );

  return useCase;
}
