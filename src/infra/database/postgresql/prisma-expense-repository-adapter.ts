import { CreateExpenseRepository } from '@/data/protocols/database/create-expense-repository';
import { CreateManyExpenseRepository } from '@/data/protocols/database/create-many-expense-repository';

import { database } from './database';
import { expenseMapper } from './mappers/expense-mapper';

export class PrismaExpenseRepositoryAdapter
  implements CreateExpenseRepository, CreateManyExpenseRepository
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
}
