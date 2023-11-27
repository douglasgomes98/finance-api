import { YouAreNotAllowedToChangeThisResourceError } from '@/domain/errors/you-no-have-permission-error';
import { IgnoreExpense } from '@/domain/use-cases/ignore-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { UpdateExpenseRepository } from '../protocols/database/update-expense-repository';
import { IgnoreExpenseValidator } from '../protocols/validators/ignore-expense-validator';
import { FindExpenseByIdUseCase } from './find-expense-by-id-use-case';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { UpdateCreditCardLimitUseCase } from './update-credit-card-limit-use-case';

export class IgnoreExpenseUseCase
  implements UseCase<IgnoreExpense.Params, IgnoreExpense.Result>
{
  constructor(
    private readonly ignoreExpenseValidator: IgnoreExpenseValidator,
    private readonly findExpenseByIdUseCase: FindExpenseByIdUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateExpenseRepository: UpdateExpenseRepository,
    private readonly updateCreditCardLimitUseCase: UpdateCreditCardLimitUseCase,
  ) {}

  async execute(params: IgnoreExpense.Params): Promise<IgnoreExpense.Result> {
    const {
      id,
      isIgnored,
      all = true,
      userId,
    } = this.ignoreExpenseValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const expense = await this.findExpenseByIdUseCase.execute({
      id,
      userId: user.id,
    });

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
      userId: user.id,
    });

    return updatedExpense;
  }
}
