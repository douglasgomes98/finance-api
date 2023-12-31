import { ExpenseModel } from '../entities/expense-model';

export namespace PaidExpense {
  export type Params = {
    id: string;
    isPaid: boolean;
    userId: string;
  };

  export type Result = ExpenseModel;
}
