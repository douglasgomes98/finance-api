import { ListExpenseByCategoryUseCase } from '@/data/use-cases/list-expense-by-category-use-case';
import { ZodListExpenseByCategoryValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-by-category-validator-adapter';

import { makeListCategoryUseCase } from './make-list-category-use-case';
import { makeListExpenseUseCase } from './make-list-expense-use-case';

export function makeListExpenseByCategoryUseCase() {
  const listCategoryUseCase = makeListCategoryUseCase();
  const listExpenseUseCase = makeListExpenseUseCase();
  const zodListExpenseByCategoryValidatorAdapter =
    new ZodListExpenseByCategoryValidatorAdapter();
  const useCase = new ListExpenseByCategoryUseCase(
    zodListExpenseByCategoryValidatorAdapter,
    listCategoryUseCase,
    listExpenseUseCase,
  );

  return useCase;
}
