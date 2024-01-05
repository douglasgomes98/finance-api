import { CategoryModel } from '../entities/category-model';
import { ExpenseModel } from '../entities/expense-model';

export namespace ListExpenseByCategory {
  export type Params = {
    userId: string;
    month: number;
    year: number;
  };

  export type Result = {
    details: Array<{
      category: CategoryModel;
      expenses: Array<ExpenseModel>;
      amount: number;
    }>;
  };
}
