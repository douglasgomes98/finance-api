import { ExpenseModel } from '../entities/expense-model';

export namespace ListExpense {
  export type Params = {
    month: number;
    year: number;
  };

  export type Result = ExpenseModel[];
}
