import { ListExpenseByCreditCardUseCase } from '@/data/use-cases/list-expense-by-credit-card-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';
import { ZodListExpenseByCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-by-credit-card-validator-adapter';

import { makeFindCreditCardByIdUseCase } from './make-find-credit-card-by-id-use-case';

export function makeListExpenseByCreditCardUseCase() {
  const findCreditCardByIdUseCase = makeFindCreditCardByIdUseCase();
  const dateFnsAdapter = new DateFnsAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodListExpenseByCreditCardValidatorAdapter =
    new ZodListExpenseByCreditCardValidatorAdapter();
  const useCase = new ListExpenseByCreditCardUseCase(
    findCreditCardByIdUseCase,
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    prismaExpenseRepositoryAdapter,
    zodListExpenseByCreditCardValidatorAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
  );

  return useCase;
}
