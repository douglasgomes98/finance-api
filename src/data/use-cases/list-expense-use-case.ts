import { ListExpense } from '@/domain/use-cases/list-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { ListExpenseValidator } from '../protocols/validators/list-expense-validator';
import { ListExpenseByCreditCardUseCase } from './list-expense-by-credit-card-use-case';
import { ListCreditCardUseCase } from './list-credit-card-use-case';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
// TODO: add wallet expenses
export class ListExpenseUseCase
  implements UseCase<ListExpense.Params, ListExpense.Result>
{
  constructor(
    private readonly listExpenseValidator: ListExpenseValidator,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly listExpenseByCreditCardUseCase: ListExpenseByCreditCardUseCase,
    private readonly listCreditCardUseCase: ListCreditCardUseCase,
  ) {}

  async execute(params: ListExpense.Params): Promise<ListExpense.Result> {
    const { month, year, userId } = this.listExpenseValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const creditCards = await this.listCreditCardUseCase.execute({ userId });

    const expensesByCreditCard = await Promise.all([
      ...creditCards.map(creditCard =>
        this.listExpenseByCreditCardUseCase.execute({
          creditCardId: creditCard.id,
          month,
          year,
          userId: user.id,
        }),
      ),
    ]);

    const expensesList = expensesByCreditCard.flat();

    const expenses = expensesList.flatMap(list => list.expenses);

    return {
      expenses,
    };
  }
}
