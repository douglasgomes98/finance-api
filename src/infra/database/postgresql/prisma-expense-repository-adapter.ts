import { CreateExpenseRepository } from '@/data/protocols/database/create-expense-repository';
import { CreateManyExpenseRepository } from '@/data/protocols/database/create-many-expense-repository';
import { FindExpenseByCreditCardIdAndDateRangeRepository } from '@/data/protocols/database/find-expense-by-credit-card-id-and-date-range';

import { database } from './database';
import { expenseMapper } from './mappers/expense-mapper';

export class PrismaExpenseRepositoryAdapter
  implements
    CreateExpenseRepository,
    CreateManyExpenseRepository,
    FindExpenseByCreditCardIdAndDateRangeRepository
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

  async findExpenseByCreditCardIdAndDateRange(
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
    });

    return rows.map(expenseMapper.toEntity);
  }
}
