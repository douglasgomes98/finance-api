import { PaidExpense } from '@/domain/use-cases/paid-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { PaidExpenseValidator } from '../protocols/validators/paid-expense-validator';
import { UpdateExpenseRepository } from '../protocols/database/update-expense-repository';
import { UpdateCreditCardLimitUseCase } from './update-credit-card-limit-use-case';
import { FindExpenseByIdUseCase } from './find-expense-by-id-use-case';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';

export class PaidExpenseUseCase
  implements UseCase<PaidExpense.Params, PaidExpense.Result>
{
  constructor(
    private readonly paidExpenseValidator: PaidExpenseValidator,
    private readonly findExpenseByIdUseCase: FindExpenseByIdUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateExpenseRepository: UpdateExpenseRepository,
    private readonly updateCreditCardLimitUseCase: UpdateCreditCardLimitUseCase,
  ) {}

  async execute(params: PaidExpense.Params): Promise<PaidExpense.Result> {
    const { id, isPaid, userId } = this.paidExpenseValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const expense = await this.findExpenseByIdUseCase.execute({
      id,
      userId: user.id,
    });

    const updatedExpense = await this.updateExpenseRepository.update({
      id,
      data: { isPaid },
    });

    await this.updateCreditCardLimitUseCase.execute({
      id: expense.creditCardId,
      userId: user.id,
    });

    return updatedExpense;
  }
}
