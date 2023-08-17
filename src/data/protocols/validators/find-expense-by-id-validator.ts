export namespace FindExpenseByIdValidator {
  export type Params = {
    id: string;
  };

  export type Result = {
    id: string;
  };
}

export type FindExpenseByIdValidator = {
  validate: (
    params: FindExpenseByIdValidator.Params,
  ) => FindExpenseByIdValidator.Result;
};
