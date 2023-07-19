import { ExpenseModel } from '../entities/expense-model';

export namespace ListExpenseByCreditCard {
  export type Params = {
    creditCardId: string;
    month: number;
    year: number;
  };

  export type Result = ExpenseModel[];
}
