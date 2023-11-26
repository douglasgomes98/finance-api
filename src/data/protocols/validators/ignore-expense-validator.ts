export namespace IgnoreExpenseValidator {
  export type Params = {
    id: string;
    isIgnored: boolean;
    all?: boolean;
    userId: string;
  };

  export type Result = {
    id: string;
    isIgnored: boolean;
    all?: boolean;
    userId: string;
  };
}

export type IgnoreExpenseValidator = {
  validate: (
    params: IgnoreExpenseValidator.Params,
  ) => IgnoreExpenseValidator.Result;
};
