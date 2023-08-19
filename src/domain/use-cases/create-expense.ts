import { ExpenseModel } from '../entities/expense-model';

export namespace CreateExpense {
  export type Params = Omit<
    ExpenseModel,
    'id' | 'isPaid' | 'installmentsIdentifier' | 'invoiceDate'
  > & {
    installments?: number;
  };

  export type Result = ExpenseModel;
}
