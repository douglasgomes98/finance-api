import { FindBankRepository } from '@/data/protocols/database/find-bank';

import { database } from './database';
import { bankMapper } from './mappers/bank-mapper';

export class PrismaBankRepositoryAdapter implements FindBankRepository {
  async find(): Promise<FindBankRepository.Result> {
    const rows = await database.bank.findMany();

    return rows.map(bankMapper.toEntity);
  }
}
