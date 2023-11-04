import { ListExpenseByCategory } from '@/domain/use-cases/list-expense-by-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { ListExpenseByCategoryValidator } from '../protocols/validators/list-expense-by-category-validator';
import { ListExpenseUseCase } from './list-expense-use-case';
import { ListCategoryUseCase } from './list-category-use-case';

export class ListExpenseByCategoryUseCase
  implements
    UseCase<ListExpenseByCategory.Params, ListExpenseByCategory.Result>
{
  constructor(
    private readonly listExpenseByCategoryValidator: ListExpenseByCategoryValidator,
    private readonly listCategoryUseCase: ListCategoryUseCase,
    private readonly listExpenseUseCase: ListExpenseUseCase,
  ) {}

  async execute(
    params: ListExpenseByCategory.Params,
  ): Promise<ListExpenseByCategory.Result> {
    const { userId, month, year } =
      this.listExpenseByCategoryValidator.validate(params);

    const categories = await this.listCategoryUseCase.execute({ userId });

    const { amount, expenses } = await this.listExpenseUseCase.execute({
      userId,
      month,
      year,
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
      amount,
      details,
    };
  }
}
