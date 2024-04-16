import { CreateCreditCardRepository } from '@/data/protocols/database/create-credit-card-repository';
import { DeleteCreditCardRepository } from '@/data/protocols/database/delete-credit-card-repository';
import { FindCreditCardByIdRepository } from '@/data/protocols/database/find-credit-card-by-id-repository';
import { FindCreditCardByUserAndNameRepository } from '@/data/protocols/database/find-credit-card-by-user-and-name-repository';
import { FindCreditCardByUserRepository } from '@/data/protocols/database/find-credit-card-by-user-repository';
import { FindCreditCardClosedByDateRepository } from '@/data/protocols/database/find-credit-card-closed-by-date';
import { UpdateCreditCardRepository } from '@/data/protocols/database/update-credit-card-repository';
import { CreditCardModel } from '@/domain/entities/credit-card-model';

import { database } from './database';
import { creditCardMapper } from './mappers/credit-card-mapper';

export class PrismaCreditCardRepositoryAdapter
  implements
    FindCreditCardByUserAndNameRepository,
    CreateCreditCardRepository,
    FindCreditCardByUserRepository,
    FindCreditCardByIdRepository,
    DeleteCreditCardRepository,
    UpdateCreditCardRepository,
    FindCreditCardClosedByDateRepository
{
  async findById({
    id,
  }: FindCreditCardByIdRepository.Params): Promise<FindCreditCardByIdRepository.Result> {
    const row = await database.creditCard.findFirst({
      where: {
        id,
      },
    });

    if (!row) return null;

    return creditCardMapper.toEntity(row);
  }

  async findByUser({
    id,
  }: FindCreditCardByUserRepository.Params): Promise<FindCreditCardByUserRepository.Result> {
    const rows = await database.creditCard.findMany({
      where: {
        userId: id,
      },
      orderBy: { name: 'asc' },
    });

    return rows.map(creditCardMapper.toEntity);
  }

  async findByUserAndName({
    name,
  }: FindCreditCardByUserAndNameRepository.Params): Promise<FindCreditCardByUserAndNameRepository.Result> {
    const row = await database.creditCard.findFirst({
      where: {
        name,
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

  async delete({
    id,
  }: DeleteCreditCardRepository.Params): Promise<DeleteCreditCardRepository.Result> {
    await database.creditCard.delete({
      where: {
        id,
      },
    });
  }

  async update({
    id,
    data,
  }: UpdateCreditCardRepository.Params): Promise<UpdateCreditCardRepository.Result> {
    const row = await database.creditCard.update({
      where: {
        id,
      },
      data,
    });

    return creditCardMapper.toEntity(row);
  }

  async findClosedByDate({
    date,
  }: FindCreditCardClosedByDateRepository.Params): Promise<FindCreditCardClosedByDateRepository.Result> {
    const dateDay = Number(date.toISOString().split('T')[0].slice(-2));

    const rows = await database.creditCard.findMany({
      where: {
        closingDay: {
          equals: dateDay,
        },
      },
    });

    return rows.map(creditCardMapper.toEntity);
  }
}
