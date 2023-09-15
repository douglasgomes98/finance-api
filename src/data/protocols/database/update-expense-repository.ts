import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace UpdateExpenseRepository {
  export type Params = {
    id: string;
    all?: boolean;
    data: Partial<ExpenseModel>;
  };

  export type Result = ExpenseModel;
}

export type UpdateExpenseRepository = {
  update: (
    params: UpdateExpenseRepository.Params,
  ) => Promise<UpdateExpenseRepository.Result>;
};
