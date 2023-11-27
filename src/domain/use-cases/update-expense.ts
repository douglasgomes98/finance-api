import { ExpenseModel } from '../entities/expense-model';

export namespace UpdateExpense {
  export type Params = {
    id: string;
    data: Partial<ExpenseModel>;
    all?: boolean;
    userId: string;
  };

  export type Result = ExpenseModel;
}
