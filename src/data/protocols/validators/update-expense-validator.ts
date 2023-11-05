import { ExpenseModel } from '@/domain/entities/expense-model';

export namespace UpdateExpenseValidator {
  export type Params = {
    id: string;
    data: Partial<ExpenseModel>;
    all?: boolean;
  };

  export type Result = {
    id: string;
    data: Partial<ExpenseModel>;
    all?: boolean;
  };
}

export type UpdateExpenseValidator = {
  validate: (
    params: UpdateExpenseValidator.Params,
  ) => UpdateExpenseValidator.Result;
};
