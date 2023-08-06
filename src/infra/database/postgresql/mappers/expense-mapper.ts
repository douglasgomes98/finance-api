import { ExpenseModel } from '@/domain/entities/expense-model';
import { Expense } from '@prisma/client';

import { Mapper } from '../../mapper';

export class ExpenseMapper implements Mapper<ExpenseModel, Expense> {
  toRepository(data: ExpenseModel): Partial<Expense> {
    return {
      id: data.id,
      name: data.name,
      value: data.value,
      purchaseDate: data.purchaseDate,
      invoiceDate: data.invoiceDate,
      isPaid: data.isPaid,
      isIgnored: data.isIgnored,
      isFixed: data.isFixed,
      installmentsIdentifier: data.installmentsIdentifier,
      categoryId: data.categoryId,
      creditCardId: data.creditCardId,
      userId: data.userId,
    };
  }

  toEntity(data: Expense): ExpenseModel {
    return {
      id: data.id,
      name: data.name,
      value: data.value,
      purchaseDate: data.purchaseDate,
      invoiceDate: data.invoiceDate,
      isPaid: data.isPaid,
      isIgnored: data.isIgnored,
      isFixed: data.isFixed,
      installmentsIdentifier: data.installmentsIdentifier,
      categoryId: data.categoryId,
      creditCardId: data.creditCardId || '',
      userId: data.userId || '',
    };
  }
}

export const expenseMapper = new ExpenseMapper();
