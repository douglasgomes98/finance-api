import { FindExpenseById } from '@/domain/use-cases/find-expense-by-id';
import { UseCase } from '@/domain/use-cases/use-case';
import { ExpenseNotFoundError } from '@/domain/errors/expense-not-found-error';

import { FindExpenseByIdRepository } from '../protocols/database/find-expense-by-id-repository';

export class FindExpenseByIdUseCase
  implements UseCase<FindExpenseById.Params, FindExpenseById.Result>
{
  constructor(
    private readonly findExpenseByIdRepository: FindExpenseByIdRepository,
  ) {}

  async execute(
    params: FindExpenseById.Params,
  ): Promise<FindExpenseById.Result> {
    const result = await this.findExpenseByIdRepository.findById(params);

    if (!result) {
      throw new ExpenseNotFoundError();
    }

    return result;
  }
}
