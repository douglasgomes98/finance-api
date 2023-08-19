import { ExpenseModel } from '../entities/expense-model';

export namespace ChangeExpenseInvoiceDate {
  export type Params = {
    id: string;
    increaseInvoiceMonth: number;
  };

  export type Result = ExpenseModel;
}
