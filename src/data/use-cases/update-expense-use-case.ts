import { UpdateExpense } from '@/domain/use-cases/update-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { UpdateExpenseValidator } from '../protocols/validators/update-expense-validator';
import { FindExpenseByIdUseCase } from './find-expense-by-id-use-case';
import { UpdateExpenseRepository } from '../protocols/database/update-expense-repository';

export class UpdateExpenseUseCase
  implements UseCase<UpdateExpense.Params, UpdateExpense.Result>
{
  constructor(
    private readonly updateExpenseValidator: UpdateExpenseValidator,
    private readonly findExpenseByIdUseCase: FindExpenseByIdUseCase,
    private readonly updateExpenseRepository: UpdateExpenseRepository,
  ) {}

  async execute(params: UpdateExpense.Params): Promise<UpdateExpense.Result> {
    const {
      id,
      data,
      all = true,
    } = this.updateExpenseValidator.validate(params);

    const expense = await this.findExpenseByIdUseCase.execute({ id });

    const updatedExpense = await this.updateExpenseRepository.update({
      id: expense.id,
      data: {
        categoryId: data.categoryId,
        creditCardId: data.creditCardId,
        value: data.value,
      },
      all,
    });

    return updatedExpense;
  }
}
