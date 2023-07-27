import { FindBankById } from '@/domain/use-cases/find-bank-by-id';
import { UseCase } from '@/domain/use-cases/use-case';
import { BankNotFoundError } from '@/domain/errors/bank-not-found-error';

import { FindBankByIdRepository } from '../protocols/database/find-bank-by-id';

export class FindBankByIdUseCase
  implements UseCase<FindBankById.Params, FindBankById.Result>
{
  constructor(
    private readonly findBankByIdRepository: FindBankByIdRepository,
  ) {}

  async execute(params: FindBankById.Params): Promise<FindBankById.Result> {
    const result = await this.findBankByIdRepository.findBankById(params);

    if (!result) {
      throw new BankNotFoundError();
    }

    return result;
  }
}
