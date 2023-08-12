import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace FindExpenseByIdRepository {
  export type Params = {
    id: string;
  };

  export type Result = ExpenseModel | null;
}

export type FindExpenseByIdRepository = {
  findById: (
    params: FindExpenseByIdRepository.Params,
  ) => Promise<FindExpenseByIdRepository.Result>;
};
