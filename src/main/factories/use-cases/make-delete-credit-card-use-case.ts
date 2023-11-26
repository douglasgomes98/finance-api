import { DeleteCreditCardUseCase } from '@/data/use-cases/delete-credit-card-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodDeleteCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-delete-credit-card-validator-adapter';

import { makeFindCreditCardByIdUseCase } from './make-find-credit-card-by-id-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeDeleteCreditCardUseCase() {
  const findCreditCardByIdUseCase = makeFindCreditCardByIdUseCase();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodDeleteCreditCardValidatorAdapter =
    new ZodDeleteCreditCardValidatorAdapter();
  const useCase = new DeleteCreditCardUseCase(
    findCreditCardByIdUseCase,
    prismaCreditCardRepositoryAdapter,
    findUserByIdUseCase,
    prismaExpenseRepositoryAdapter,
    zodDeleteCreditCardValidatorAdapter,
  );

  return useCase;
}
