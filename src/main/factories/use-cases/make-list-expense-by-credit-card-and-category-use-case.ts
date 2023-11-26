import { ListExpenseByCreditCardAndCategoryUseCase } from '@/data/use-cases/list-expense-by-credit-card-and-category-use-case';
import { ZodListExpenseByCreditCardAndCategoryValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-by-credit-card-and-category-validator-adapter';

import { makeListCategoryUseCase } from './make-list-category-use-case';
import { makeListExpenseByCreditCardUseCase } from './make-list-expense-by-credit-card-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeListExpenseByCreditCardAndCategoryUseCase() {
  const listCategoryUseCase = makeListCategoryUseCase();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const listExpenseByCreditCardUseCase = makeListExpenseByCreditCardUseCase();
  const zodListExpenseByCreditCardAndCategoryValidatorAdapter =
    new ZodListExpenseByCreditCardAndCategoryValidatorAdapter();
  const useCase = new ListExpenseByCreditCardAndCategoryUseCase(
    zodListExpenseByCreditCardAndCategoryValidatorAdapter,
    findUserByIdUseCase,
    listCategoryUseCase,
    listExpenseByCreditCardUseCase,
  );

  return useCase;
}
