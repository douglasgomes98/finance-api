import { ListExpenseByWalletAndCategoryUseCase } from '@/data/use-cases/list-expense-by-wallet-and-category-use-case';
import { ZodListExpenseByWalletAndCategoryValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-by-wallet-and-category-validator-adapter';

import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';
import { makeListCategoryUseCase } from './make-list-category-use-case';
import { makeListExpenseByWalletUseCase } from './make-list-expense-by-wallet-use-case';

export function makeListExpenseByWalletAndCategoryUseCase() {
  const zodListExpenseByWalletAndCategoryValidatorAdapter =
    new ZodListExpenseByWalletAndCategoryValidatorAdapter();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const listCategoryUseCase = makeListCategoryUseCase();
  const listExpenseByWalletUseCase = makeListExpenseByWalletUseCase();
  const useCase = new ListExpenseByWalletAndCategoryUseCase(
    zodListExpenseByWalletAndCategoryValidatorAdapter,
    findUserByIdUseCase,
    listCategoryUseCase,
    listExpenseByWalletUseCase,
  );

  return useCase;
}
