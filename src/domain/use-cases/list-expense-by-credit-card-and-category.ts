import { CategoryModel } from '../entities/category-model';
import { ExpenseModel } from '../entities/expense-model';

export namespace ListExpenseByCreditCardAndCategory {
  export type Params = {
    userId: string;
    creditCardId: string;
    month: number;
    year: number;
  };

  export type Result = {
    amount: number;
    details: Array<{
      category: CategoryModel;
      expenses: Array<ExpenseModel>;
      amount: number;
    }>;
  };
}
