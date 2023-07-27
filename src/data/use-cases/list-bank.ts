import { ListBank } from '@/domain/use-cases/list-bank';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindBankRepository } from '../protocols/database/find-bank';

export class ListBankUseCase
  implements UseCase<ListBank.Params, ListBank.Result>
{
  constructor(private readonly findBankRepository: FindBankRepository) {}

  async execute(): Promise<ListBank.Result> {
    const result = await this.findBankRepository.find();

    return result;
  }
}
