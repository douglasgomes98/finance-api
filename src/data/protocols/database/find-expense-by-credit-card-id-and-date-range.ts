import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace FindExpenseByCreditCardIdAndDateRangeRepository {
  export type Params = {
    creditCardId: string;
    startDate: Date;
    endDate: Date;
  };

  export type Result = ExpenseModel[];
}

export type FindExpenseByCreditCardIdAndDateRangeRepository = {
  findExpenseByCreditCardIdAndDateRange: (
    data: FindExpenseByCreditCardIdAndDateRangeRepository.Params,
  ) => Promise<FindExpenseByCreditCardIdAndDateRangeRepository.Result>;
};
