import { ListExpenseByCreditCardAndCategory } from '@/domain/use-cases/list-expense-by-credit-card-and-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { ListExpenseByCreditCardAndCategoryValidator } from '../protocols/validators/list-expense-by-credit-card-and-category-validator';
import { ListCategoryUseCase } from './list-category-use-case';
import { ListExpenseByCreditCardUseCase } from './list-expense-by-credit-card-use-case';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';

export class ListExpenseByCreditCardAndCategoryUseCase
  implements
    UseCase<
      ListExpenseByCreditCardAndCategory.Params,
      ListExpenseByCreditCardAndCategory.Result
    >
{
  constructor(
    private readonly listExpenseByCreditCardAndCategoryValidator: ListExpenseByCreditCardAndCategoryValidator,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly listCategoryUseCase: ListCategoryUseCase,
    private readonly listExpenseByCreditCardUseCase: ListExpenseByCreditCardUseCase,
  ) {}

  async execute(
    params: ListExpenseByCreditCardAndCategory.Params,
  ): Promise<ListExpenseByCreditCardAndCategory.Result> {
    const { userId, creditCardId, month, year } =
      this.listExpenseByCreditCardAndCategoryValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const categories = await this.listCategoryUseCase.execute({
      userId: user.id,
    });

    const { amount, expenses } =
      await this.listExpenseByCreditCardUseCase.execute({
        creditCardId,
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
      amount,
      details,
    };
  }
}
