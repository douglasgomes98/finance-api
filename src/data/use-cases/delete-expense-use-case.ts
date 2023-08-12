import { DeleteExpense } from '@/domain/use-cases/delete-expense';
import { UseCase } from '@/domain/use-cases/use-case';
import { YouAreNotAllowedToChangeThisResourceError } from '@/domain/errors/you-no-have-permission-error';

import { FindExpenseByIdUseCase } from './find-expense-by-id-use-case';
import { DeleteExpenseRepository } from '../protocols/database/delete-expense-repository';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';

export class DeleteExpenseUseCase
  implements UseCase<DeleteExpense.Params, DeleteExpense.Result>
{
  constructor(
    private readonly findExpenseByIdUseCase: FindExpenseByIdUseCase,
    private readonly deleteExpenseRepository: DeleteExpenseRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute({ expenseId, userId }: DeleteExpense.Params): Promise<void> {
    const [user, expense] = await Promise.all([
      this.findUserByIdUseCase.execute({ id: userId }),
      this.findExpenseByIdUseCase.execute({ id: expenseId }),
    ]);

    if (expense.userId !== user.id) {
      throw new YouAreNotAllowedToChangeThisResourceError();
    }

    await this.deleteExpenseRepository.delete({ id: expense.id });
  }
}
