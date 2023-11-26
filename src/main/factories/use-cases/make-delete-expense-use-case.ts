import { DeleteExpenseUseCase } from '@/data/use-cases/delete-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodDeleteExpenseValidatorAdapter } from '@/infra/validators/zod/zod-delete-expense-validator-adapter';

import { makeFindExpenseByIdUseCase } from './make-find-expense-by-id-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';
import { makeUpdateCreditCardLimitUseCase } from './make-update-credit-card-limit-use-case';

export function makeDeleteExpenseUseCase() {
  const findExpenseByIdUseCase = makeFindExpenseByIdUseCase();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const updateCreditCardLimitUseCase = makeUpdateCreditCardLimitUseCase();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodDeleteExpenseValidatorAdapter =
    new ZodDeleteExpenseValidatorAdapter();
  const useCase = new DeleteExpenseUseCase(
    findExpenseByIdUseCase,
    prismaExpenseRepositoryAdapter,
    findUserByIdUseCase,
    zodDeleteExpenseValidatorAdapter,
    updateCreditCardLimitUseCase,
  );

  return useCase;
}
