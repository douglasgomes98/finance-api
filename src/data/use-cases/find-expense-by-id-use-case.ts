import { FindExpenseById } from '@/domain/use-cases/find-expense-by-id';
import { UseCase } from '@/domain/use-cases/use-case';
import { ExpenseNotFoundError } from '@/domain/errors/expense-not-found-error';

import { FindExpenseByIdRepository } from '../protocols/database/find-expense-by-id-repository';
import { FindExpenseByIdValidator } from '../protocols/validators/find-expense-by-id-validator';

export class FindExpenseByIdUseCase
  implements UseCase<FindExpenseById.Params, FindExpenseById.Result>
{
  constructor(
    private readonly findExpenseByIdRepository: FindExpenseByIdRepository,
    private readonly findExpenseByIdValidator: FindExpenseByIdValidator,
  ) {}

  async execute(
    params: FindExpenseById.Params,
  ): Promise<FindExpenseById.Result> {
    const { id } = this.findExpenseByIdValidator.validate(params);

    const result = await this.findExpenseByIdRepository.findById({ id });

    if (!result) {
      throw new ExpenseNotFoundError();
    }

    return result;
  }
}
