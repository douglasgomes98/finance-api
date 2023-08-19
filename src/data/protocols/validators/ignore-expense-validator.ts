export namespace IgnoreExpenseValidator {
  export type Params = {
    id: string;
    isIgnored: boolean;
  };

  export type Result = {
    id: string;
    isIgnored: boolean;
  };
}

export type IgnoreExpenseValidator = {
  validate: (
    params: IgnoreExpenseValidator.Params,
  ) => IgnoreExpenseValidator.Result;
};
