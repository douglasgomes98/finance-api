import { CreateExpenseRepository } from '@/data/protocols/database/create-expense-repository';
import { CreateManyExpenseRepository } from '@/data/protocols/database/create-many-expense-repository';
import { DeleteExpenseRepository } from '@/data/protocols/database/delete-expense-repository';
import { FindExpenseByCreditCardIdAndDateRangeRepository } from '@/data/protocols/database/find-expense-by-credit-card-id-and-date-range-repository';
import { FindExpenseByIdRepository } from '@/data/protocols/database/find-expense-by-id-repository';
import { DeleteAllExpenseByCreditCardRepository } from '@/data/protocols/database/delete-all-expense-by-credit-card';

import { database } from './database';
import { expenseMapper } from './mappers/expense-mapper';

export class PrismaExpenseRepositoryAdapter
  implements
    CreateExpenseRepository,
    CreateManyExpenseRepository,
    FindExpenseByCreditCardIdAndDateRangeRepository,
    FindExpenseByIdRepository,
    DeleteExpenseRepository,
    DeleteAllExpenseByCreditCardRepository
{
  async create(
    data: CreateExpenseRepository.Params,
  ): Promise<CreateExpenseRepository.Result> {
    const row = await database.expense.create({
      data,
    });

    return expenseMapper.toEntity(row);
  }

  async createMany(
    expenses: CreateManyExpenseRepository.Params,
  ): Promise<CreateManyExpenseRepository.Result> {
    await database.expense.createMany({
      data: expenses,
    });

    const rows = await database.expense.findMany({
      where: {
        installmentsIdentifier: expenses[0].installmentsIdentifier,
      },
    });

    return rows.map(expenseMapper.toEntity);
  }

  async findByCreditCardIdAndDateRange(
    data: FindExpenseByCreditCardIdAndDateRangeRepository.Params,
  ): Promise<FindExpenseByCreditCardIdAndDateRangeRepository.Result> {
    const rows = await database.expense.findMany({
      where: {
        creditCardId: data.creditCardId,
        invoiceDate: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
      orderBy: {
        purchaseDate: 'asc',
      },
    });

    return rows.map(expenseMapper.toEntity);
  }

  async findById(
    params: FindExpenseByIdRepository.Params,
  ): Promise<FindExpenseByIdRepository.Result> {
    const row = await database.expense.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!row) return null;

    return expenseMapper.toEntity(row);
  }

  async delete(
    params: DeleteExpenseRepository.Params,
  ): Promise<DeleteExpenseRepository.Result> {
    const row = await database.expense.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!row) return;

    await database.expense.deleteMany({
      where: {
        installmentsIdentifier: row.installmentsIdentifier,
      },
    });
  }

  async deleteAllByCreditCard(
    params: DeleteAllExpenseByCreditCardRepository.Params,
  ): Promise<DeleteAllExpenseByCreditCardRepository.Result> {
    await database.expense.deleteMany({
      where: {
        creditCardId: params.creditCardId,
      },
    });
  }
}
