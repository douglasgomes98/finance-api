import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace CreateManyExpenseRepository {
  export type Params = Omit<ExpenseModel, 'id'>[];

  export type Result = ExpenseModel[];
}

export type CreateManyExpenseRepository = {
  createMany: (
    data: CreateManyExpenseRepository.Params,
  ) => Promise<CreateManyExpenseRepository.Result>;
};
