import { IgnoreExpense } from '@/domain/use-cases/ignore-expense';
import { UseCase } from '@/domain/use-cases/use-case';
import { ExpenseNotFoundError } from '@/domain/errors/expense-not-found-error';

import { IgnoreExpenseValidator } from '../protocols/validators/ignore-expense-validator';
import { FindExpenseByIdRepository } from '../protocols/database/find-expense-by-id-repository';
import { UpdateExpenseRepository } from '../protocols/database/update-expense-repository';

export class IgnoreExpenseUseCase
  implements UseCase<IgnoreExpense.Params, IgnoreExpense.Result>
{
  constructor(
    private readonly ignoreExpenseValidator: IgnoreExpenseValidator,
    private readonly findExpenseByIdRepository: FindExpenseByIdRepository,
    private readonly updateExpenseRepository: UpdateExpenseRepository,
  ) {}

  async execute(params: IgnoreExpense.Params): Promise<IgnoreExpense.Result> {
    const { id, isIgnored } = this.ignoreExpenseValidator.validate(params);

    const expense = await this.findExpenseByIdRepository.findById({ id });

    if (!expense) {
      throw new ExpenseNotFoundError();
    }

    const updatedExpense = await this.updateExpenseRepository.update({
      id,
      data: { isIgnored },
    });

    return updatedExpense;
  }
}
