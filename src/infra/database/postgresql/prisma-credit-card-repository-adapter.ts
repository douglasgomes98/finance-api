import { CreateCreditCardRepository } from '@/data/protocols/database/create-credit-card';
import { FindCreditCardByUserAndNameRepository } from '@/data/protocols/database/find-credit-card-by-user-and-name';
import { CreditCardModel } from '@/domain/entities/credit-card-model';

import { database } from './database';
import { creditCardMapper } from './mappers/credit-card-mapper';

export class PrismaCreditCardRepositoryAdapter
  implements FindCreditCardByUserAndNameRepository, CreateCreditCardRepository
{
  async findByUserAndName(
    data: FindCreditCardByUserAndNameRepository.Params,
  ): Promise<FindCreditCardByUserAndNameRepository.Result> {
    const row = await database.creditCard.findFirst({
      where: {
        userId: data.userId,
        name: data.name,
      },
    });

    if (!row) return null;

    return creditCardMapper.toEntity(row);
  }

  async create(
    data: CreateCreditCardRepository.Params,
  ): Promise<CreditCardModel> {
    const row = await database.creditCard.create({
      data,
    });

    return creditCardMapper.toEntity(row);
  }
}
