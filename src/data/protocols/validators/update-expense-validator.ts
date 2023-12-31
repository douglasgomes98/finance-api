import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace UpdateExpenseValidator {
  export type Params = {
    id: string;
    data: Partial<ExpenseModel>;
    all?: boolean;
    userId: string;
  };

  export type Result = {
    id: string;
    data: Partial<ExpenseModel>;
    all?: boolean;
    userId: string;
  };
}

export type UpdateExpenseValidator = {
  validate: (
    params: UpdateExpenseValidator.Params,
  ) => UpdateExpenseValidator.Result;
};
