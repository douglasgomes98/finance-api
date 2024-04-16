import { CreateExpenseRepository } from '@/data/protocols/database/create-expense-repository';
import { CreateManyExpenseRepository } from '@/data/protocols/database/create-many-expense-repository';
import { DeleteAllExpenseByCreditCardRepository } from '@/data/protocols/database/delete-all-expense-by-credit-card';
import { DeleteExpenseRepository } from '@/data/protocols/database/delete-expense-repository';
import { FindExpenseByCreditCardRepository } from '@/data/protocols/database/find-expense-by-credit-card';
import { FindExpenseByCreditCardIdAndDateRangeRepository } from '@/data/protocols/database/find-expense-by-credit-card-id-and-date-range-repository';
import { FindExpenseByDateRangeRepository } from '@/data/protocols/database/find-expense-by-date-range-repository';
import { FindExpenseByIdRepository } from '@/data/protocols/database/find-expense-by-id-repository';
import { FindExpenseByWalletDateRangeRepository } from '@/data/protocols/database/find-expense-by-walltet-date-range-repository';
import { UpdateExpenseRepository } from '@/data/protocols/database/update-expense-repository';
import { ExpenseNotFoundError } from '@/domain/errors/expense-not-found-error';

import { database } from './database';
import { expenseMapper } from './mappers/expense-mapper';

export class PrismaExpenseRepositoryAdapter
  implements
    CreateExpenseRepository,
    CreateManyExpenseRepository,
    FindExpenseByCreditCardIdAndDateRangeRepository,
    FindExpenseByIdRepository,
    DeleteExpenseRepository,
    DeleteAllExpenseByCreditCardRepository,
    UpdateExpenseRepository,
    FindExpenseByCreditCardRepository,
    FindExpenseByDateRangeRepository,
    FindExpenseByWalletDateRangeRepository
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
      orderBy: {
        purchaseDate: 'desc',
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
        isFixed: data.isFixed,
        invoiceDate: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
      orderBy: {
        purchaseDate: 'desc',
      },
    });

    return rows.map(expenseMapper.toEntity);
  }

  async findByDateRange(
    data: FindExpenseByDateRangeRepository.Params,
  ): Promise<FindExpenseByDateRangeRepository.Result> {
    const rows = await database.expense.findMany({
      where: {
        invoiceDate: {
          gte: data.startDate,
          lte: data.endDate,
        },
        isFixed: data.isFixed,
      },
      orderBy: {
        purchaseDate: 'desc',
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

  async delete({
    id,
    all,
  }: DeleteExpenseRepository.Params): Promise<DeleteExpenseRepository.Result> {
    if (all) {
      const row = await database.expense.findUnique({
        where: {
          id,
        },
      });

      if (!row) return;

      await database.expense.deleteMany({
        where: {
          installmentsIdentifier: row.installmentsIdentifier,
        },
      });
    } else {
      await database.expense.delete({
        where: {
          id,
        },
      });
    }
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

  async update({
    id,
    all,
    data,
  }: UpdateExpenseRepository.Params): Promise<UpdateExpenseRepository.Result> {
    if (all) {
      const row = await database.expense.findUnique({
        where: {
          id,
        },
      });

      if (!row) {
        throw new ExpenseNotFoundError();
      }

      await database.expense.updateMany({
        where: {
          installmentsIdentifier: row.installmentsIdentifier,
        },
        data,
      });

      const rowUpdated = await database.expense.findUnique({
        where: {
          id,
        },
      });

      if (!rowUpdated) {
        throw new ExpenseNotFoundError();
      }

      return expenseMapper.toEntity(rowUpdated);
    }

    const row = await database.expense.update({
      where: {
        id,
      },
      data,
    });

    return expenseMapper.toEntity(row);
  }

  async findExpenseByCreditCard({
    creditCardId,
  }: FindExpenseByCreditCardRepository.Params): Promise<FindExpenseByCreditCardRepository.Result> {
    const rows = await database.expense.findMany({
      where: {
        creditCardId,
      },
      orderBy: {
        purchaseDate: 'desc',
      },
    });

    return rows.map(expenseMapper.toEntity);
  }

  async findExpenseByWalletDateRange(
    data: FindExpenseByWalletDateRangeRepository.Params,
  ): Promise<FindExpenseByWalletDateRangeRepository.Result> {
    const rows = await database.expense.findMany({
      where: {
        userId: data.userId,
        creditCardId: null,
        invoiceDate: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
      orderBy: {
        purchaseDate: 'desc',
      },
    });

    return rows.map(expenseMapper.toEntity);
  }
}
