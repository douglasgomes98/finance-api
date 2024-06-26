import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace FindExpenseByCreditCardIdAndDateRangeRepository {
  export type Params = {
    creditCardId: string;
    startDate: Date;
    endDate: Date;
    isFixed?: boolean;
  };

  export type Result = ExpenseModel[];
}

export type FindExpenseByCreditCardIdAndDateRangeRepository = {
  findByCreditCardIdAndDateRange: (
    data: FindExpenseByCreditCardIdAndDateRangeRepository.Params,
  ) => Promise<FindExpenseByCreditCardIdAndDateRangeRepository.Result>;
};
