import { ExpenseModel } from '../entities/expense-model';

export namespace FindExpenseById {
  export type Params = {
    id: string;
    userId?: string;
  };

  export type Result = ExpenseModel;
}
