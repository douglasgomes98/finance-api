import { ExpenseModel } from '../entities/expense-model';

export namespace IgnoreExpense {
  export type Params = {
    id: string;
    isIgnored: boolean;
  };

  export type Result = ExpenseModel;
}
