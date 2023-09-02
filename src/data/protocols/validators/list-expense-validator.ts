export namespace ListExpenseValidator {
  export type Params = {
    userId: string;
    month: number;
    year: number;
  };

  export type Result = {
    userId: string;
    month: number;
    year: number;
  };
}

export type ListExpenseValidator = {
  validate: (
    params: ListExpenseValidator.Params,
  ) => ListExpenseValidator.Result;
};
