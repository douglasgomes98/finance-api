import { ExpenseModel } from '../entities/expense-model';

export namespace ListExpenseByCreditCard {
  export type Params = {
    creditCardId: string;
    month: number;
    year: number;
    userId: string;
  };

  export type Result = {
    expenses: ExpenseModel[];
    amount: number;
  };
}
