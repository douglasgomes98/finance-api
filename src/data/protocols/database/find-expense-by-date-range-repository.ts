import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace FindExpenseByDateRange {
  export type Params = {
    startDate: Date;
    endDate: Date;
  };

  export type Result = ExpenseModel[];
}

export type FindExpenseByDateRange = {
  findByDateRange: (
    data: FindExpenseByDateRange.Params,
  ) => Promise<FindExpenseByDateRange.Result>;
};
