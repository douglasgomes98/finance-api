export namespace FindExpenseByIdValidator {
  export type Params = {
    id: string;
    userId?: string;
  };

  export type Result = {
    id: string;
    userId?: string;
  };
}

export type FindExpenseByIdValidator = {
  validate: (
    params: FindExpenseByIdValidator.Params,
  ) => FindExpenseByIdValidator.Result;
};
