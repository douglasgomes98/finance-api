import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace FindExpenseByDateRangeRepository {
  export type Params = {
    startDate: Date;
    endDate: Date;
    isFixed?: boolean;
  };

  export type Result = ExpenseModel[];
}

export type FindExpenseByDateRangeRepository = {
  findByDateRange: (
    data: FindExpenseByDateRangeRepository.Params,
  ) => Promise<FindExpenseByDateRangeRepository.Result>;
};
