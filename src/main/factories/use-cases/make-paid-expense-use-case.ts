import { PaidExpenseUseCase } from '@/data/use-cases/paid-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodPaidExpenseValidatorAdapter } from '@/infra/validators/zod/zod-paid-expense-validator-adapter';

import { makeUpdateCreditCardLimitUseCase } from './make-update-credit-card-limit-use-case';
import { makeFindExpenseByIdUseCase } from './make-find-expense-by-id-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makePaidExpenseUseCase() {
  const findExpenseByIdUseCase = makeFindExpenseByIdUseCase();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const updateCreditCardLimitUseCase = makeUpdateCreditCardLimitUseCase();
  const zodPaidExpenseValidatorAdapter = new ZodPaidExpenseValidatorAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const useCase = new PaidExpenseUseCase(
    zodPaidExpenseValidatorAdapter,
    findExpenseByIdUseCase,
    findUserByIdUseCase,
    prismaExpenseRepositoryAdapter,
    updateCreditCardLimitUseCase,
  );

  return useCase;
}
