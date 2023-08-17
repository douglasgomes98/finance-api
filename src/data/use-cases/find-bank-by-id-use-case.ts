import { FindBankById } from '@/domain/use-cases/find-bank-by-id';
import { UseCase } from '@/domain/use-cases/use-case';
import { BankNotFoundError } from '@/domain/errors/bank-not-found-error';

import { FindBankByIdRepository } from '../protocols/database/find-bank-by-id-repository';
import { FindBankByIdValidator } from '../protocols/validators/find-bank-by-id-validator';

export class FindBankByIdUseCase
  implements UseCase<FindBankById.Params, FindBankById.Result>
{
  constructor(
    private readonly findBankByIdRepository: FindBankByIdRepository,
    private readonly findBankByIdValidator: FindBankByIdValidator,
  ) {}

  async execute(params: FindBankById.Params): Promise<FindBankById.Result> {
    const { id } = this.findBankByIdValidator.validate(params);

    const result = await this.findBankByIdRepository.findBankById({ id });

    if (!result) {
      throw new BankNotFoundError();
    }

    return result;
  }
}
