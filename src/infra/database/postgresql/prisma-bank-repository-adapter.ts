import { FindBankRepository } from '@/data/protocols/database/find-bank-repository';
import { FindBankByIdRepository } from '@/data/protocols/database/find-bank-by-id-repository';

import { database } from './database';
import { bankMapper } from './mappers/bank-mapper';

export class PrismaBankRepositoryAdapter
  implements FindBankRepository, FindBankByIdRepository
{
  async find(): Promise<FindBankRepository.Result> {
    const rows = await database.bank.findMany({ orderBy: { name: 'asc' } });

    return rows.map(bankMapper.toEntity);
  }

  async findBankById({
    id,
  }: FindBankByIdRepository.Params): Promise<FindBankByIdRepository.Result> {
    const row = await database.bank.findUnique({
      where: { id },
    });

    if (!row) return null;

    return bankMapper.toEntity(row);
  }
}
