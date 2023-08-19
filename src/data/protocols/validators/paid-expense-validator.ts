export namespace PaidExpenseValidator {
  export type Params = {
    id: string;
    isPaid: boolean;
  };

  export type Result = {
    id: string;
    isPaid: boolean;
  };
}

export type PaidExpenseValidator = {
  validate: (
    params: PaidExpenseValidator.Params,
  ) => PaidExpenseValidator.Result;
};
