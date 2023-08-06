import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace CreateExpenseRepository {
  export type Params = Omit<ExpenseModel, 'id'>;

  export type Result = ExpenseModel;
}

export type CreateExpenseRepository = {
  create: (
    data: CreateExpenseRepository.Params,
  ) => Promise<CreateExpenseRepository.Result>;
};
