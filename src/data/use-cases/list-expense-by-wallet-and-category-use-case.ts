import { ListExpenseByWalletAndCategory } from '@/domain/use-cases/list-expense-by-wallet-and-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { ListExpenseByWalletAndCategoryValidator } from '../protocols/validators/list-expense-by-wallet-and-category-validator';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { ListCategoryUseCase } from './list-category-use-case';
import { ListExpenseByWalletUseCase } from './list-expense-by-wallet-use-case';

export class ListExpenseByWalletAndCategoryUseCase
  implements
    UseCase<
      ListExpenseByWalletAndCategory.Params,
      ListExpenseByWalletAndCategory.Result
    >
{
  constructor(
    private readonly listExpenseByWalletAndCategoryValidator: ListExpenseByWalletAndCategoryValidator,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly listCategoryUseCase: ListCategoryUseCase,
    private readonly listExpenseByWalletUseCase: ListExpenseByWalletUseCase,
  ) {}

  async execute(
    params: ListExpenseByWalletAndCategory.Params,
  ): Promise<ListExpenseByWalletAndCategory.Result> {
    const { month, year, userId } =
      this.listExpenseByWalletAndCategoryValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const categories = await this.listCategoryUseCase.execute({
      userId: user.id,
    });

    const { expenses } = await this.listExpenseByWalletUseCase.execute({
      month,
      year,
      userId: user.id,
    });

    const details = categories.map(category => {
      const expensesByCategory = expenses.filter(
        expense => expense.categoryId === category.id,
      );

      const amountByCategory = Number(
        expensesByCategory
          .reduce((acc, expense) => acc + expense.value, 0)
          .toFixed(2),
      );

      return {
        category,
        expenses: expensesByCategory,
        amount: amountByCategory,
      };
    });

    return {
      details,
    };
  }
}
