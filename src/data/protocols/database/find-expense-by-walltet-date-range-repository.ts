import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace FindExpenseByWalletDateRangeRepository {
  export type Params = {
    userId?: string;
    startDate: Date;
    endDate: Date;
    isFixed?: boolean;
  };

  export type Result = ExpenseModel[];
}

export type FindExpenseByWalletDateRangeRepository = {
  findExpenseByWalletDateRange: (
    params: FindExpenseByWalletDateRangeRepository.Params,
  ) => Promise<FindExpenseByWalletDateRangeRepository.Result>;
};
