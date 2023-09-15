export namespace DeleteExpenseValidator {
  export type Params = {
    expenseId: string;
    userId: string;
    all?: boolean;
  };

  export type Result = {
    expenseId: string;
    userId: string;
    all?: boolean;
  };
}

export type DeleteExpenseValidator = {
  validate: (
    params: DeleteExpenseValidator.Params,
  ) => DeleteExpenseValidator.Result;
};
