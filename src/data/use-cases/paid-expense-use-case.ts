import { PaidExpense } from '@/domain/use-cases/paid-expense';
import { UseCase } from '@/domain/use-cases/use-case';
import { ExpenseNotFoundError } from '@/domain/errors/expense-not-found-error';

import { PaidExpenseValidator } from '../protocols/validators/paid-expense-validator';
import { FindExpenseByIdRepository } from '../protocols/database/find-expense-by-id-repository';
import { UpdateExpenseRepository } from '../protocols/database/update-expense-repository';

export class PaidExpenseUseCase
  implements UseCase<PaidExpense.Params, PaidExpense.Result>
{
  constructor(
    private readonly paidExpenseValidator: PaidExpenseValidator,
    private readonly findExpenseByIdRepository: FindExpenseByIdRepository,
    private readonly updateExpenseRepository: UpdateExpenseRepository,
  ) {}

  async execute(params: PaidExpense.Params): Promise<PaidExpense.Result> {
    const { id, isPaid } = this.paidExpenseValidator.validate(params);

    const expense = await this.findExpenseByIdRepository.findById({ id });

    if (!expense) {
      throw new ExpenseNotFoundError();
    }

    const updatedExpense = await this.updateExpenseRepository.update({
      id,
      data: { isPaid },
    });

    return updatedExpense;
  }
}
