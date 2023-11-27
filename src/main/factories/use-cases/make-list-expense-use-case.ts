import { ListExpenseUseCase } from '@/data/use-cases/list-expense-use-case';
import { ZodListExpenseValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-validator-adapter';

import { makeListCreditCardUseCase } from './make-list-credit-card-use-case';
import { makeListExpenseByCreditCardUseCase } from './make-list-expense-by-credit-card-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeListExpenseUseCase() {
  const listExpenseByCreditCardUseCase = makeListExpenseByCreditCardUseCase();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const listCreditCardUseCase = makeListCreditCardUseCase();
  const zodListExpenseValidatorAdapter = new ZodListExpenseValidatorAdapter();
  const useCase = new ListExpenseUseCase(
    zodListExpenseValidatorAdapter,
    findUserByIdUseCase,
    listExpenseByCreditCardUseCase,
    listCreditCardUseCase,
  );

  return useCase;
}
