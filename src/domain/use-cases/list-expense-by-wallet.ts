import { ExpenseModel } from '../entities/expense-model';

export namespace ListExpenseByWallet {
  export type Params = {
    userId: string;
    month: number;
    year: number;
  };

  export type Result = {
    expenses: ExpenseModel[];
  };
}
