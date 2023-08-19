import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace FindExpenseByCreditCardRepository {
  export type Params = {
    creditCardId: string;
  };

  export type Result = ExpenseModel[];
}

export type FindExpenseByCreditCardRepository = {
  findExpenseByCreditCard: (
    params: FindExpenseByCreditCardRepository.Params,
  ) => Promise<FindExpenseByCreditCardRepository.Result>;
};
