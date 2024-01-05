import { DeleteExpense } from '@/domain/use-cases/delete-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { DeleteExpenseRepository } from '../protocols/database/delete-expense-repository';
import { DeleteExpenseValidator } from '../protocols/validators/delete-expense-validator';
import { FindExpenseByIdUseCase } from './find-expense-by-id-use-case';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { UpdateCreditCardLimitUseCase } from './update-credit-card-limit-use-case';

export class DeleteExpenseUseCase
  implements UseCase<DeleteExpense.Params, DeleteExpense.Result>
{
  constructor(
    private readonly findExpenseByIdUseCase: FindExpenseByIdUseCase,
    private readonly deleteExpenseRepository: DeleteExpenseRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly deleteExpenseValidator: DeleteExpenseValidator,
    private readonly updateCreditCardLimitUseCase: UpdateCreditCardLimitUseCase,
  ) {}

  async execute(params: DeleteExpense.Params): Promise<DeleteExpense.Result> {
    const {
      expenseId,
      userId,
      all = true,
    } = this.deleteExpenseValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const expense = await this.findExpenseByIdUseCase.execute({
      id: expenseId,
      userId: user.id,
    });

    await this.deleteExpenseRepository.delete({ id: expense.id, all });

    if (expense.creditCardId) {
      await this.updateCreditCardLimitUseCase.execute({
        id: expense.creditCardId,
        userId: user.id,
      });
    }
  }
}
