import { ExpenseModel } from '../entities/expense-model';

export namespace CreateExpense {
  export type Params = Omit<
    ExpenseModel,
    'id' | 'isPaid' | 'isIgnored' | 'installmentsIdentifier'
  > & {
    installments?: number;
  };

  export type Result = ExpenseModel;
}
