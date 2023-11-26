export namespace PaidExpenseValidator {
  export type Params = {
    id: string;
    isPaid: boolean;
    userId: string;
  };

  export type Result = {
    id: string;
    isPaid: boolean;
    userId: string;
  };
}

export type PaidExpenseValidator = {
  validate: (
    params: PaidExpenseValidator.Params,
  ) => PaidExpenseValidator.Result;
};
