import { CategoryModel } from '../entities/category-model';
import { ExpenseModel } from '../entities/expense-model';

export namespace ListExpenseByCategory {
  export type Params = {
    userId: string;
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
