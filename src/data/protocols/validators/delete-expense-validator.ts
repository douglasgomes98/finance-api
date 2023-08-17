export namespace DeleteExpenseValidator {
  export type Params = {
    expenseId: string;
    userId: string;
  };

  export type Result = {
    expenseId: string;
    userId: string;
  };
}

export type DeleteExpenseValidator = {
  validate: (
    params: DeleteExpenseValidator.Params,
  ) => DeleteExpenseValidator.Result;
};
