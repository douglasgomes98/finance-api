import { ExpenseModel } from '../entities/expense-model';

export namespace ListExpense {
  export type Params = {
    userId: string;
    month: number;
    year: number;
  };

  export type Result = {
    expenses: ExpenseModel[];
    amount: number;
  };
}
