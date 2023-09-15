import { IgnoreExpense } from '@/domain/use-cases/ignore-expense';
import { UseCase } from '@/domain/use-cases/use-case';
import { ExpenseNotFoundError } from '@/domain/errors/expense-not-found-error';
import { YouAreNotAllowedToChangeThisResourceError } from '@/domain/errors/you-no-have-permission-error';

import { IgnoreExpenseValidator } from '../protocols/validators/ignore-expense-validator';
import { FindExpenseByIdRepository } from '../protocols/database/find-expense-by-id-repository';
import { UpdateExpenseRepository } from '../protocols/database/update-expense-repository';
import { UpdateCreditCardLimitUseCase } from './update-credit-card-limit-use-case';

export class IgnoreExpenseUseCase
  implements UseCase<IgnoreExpense.Params, IgnoreExpense.Result>
{
  constructor(
    private readonly ignoreExpenseValidator: IgnoreExpenseValidator,
    private readonly findExpenseByIdRepository: FindExpenseByIdRepository,
    private readonly updateExpenseRepository: UpdateExpenseRepository,
    private readonly updateCreditCardLimitUseCase: UpdateCreditCardLimitUseCase,
  ) {}

  async execute(params: IgnoreExpense.Params): Promise<IgnoreExpense.Result> {
    const {
      id,
      isIgnored,
      all = true,
    } = this.ignoreExpenseValidator.validate(params);

    const expense = await this.findExpenseByIdRepository.findById({ id });

    if (!expense) {
      throw new ExpenseNotFoundError();
    }

    if (expense.isPaid) {
      throw new YouAreNotAllowedToChangeThisResourceError();
    }

    const updatedExpense = await this.updateExpenseRepository.update({
      id,
      all,
      data: { isIgnored },
    });

    await this.updateCreditCardLimitUseCase.execute({
      id: expense.creditCardId,
    });

    return updatedExpense;
  }
}
