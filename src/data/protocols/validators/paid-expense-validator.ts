export namespace PaidExpenseValidator {
  export type Params = {
    id: string;
    isPaid: boolean;
  };

  export type Results = {
    id: string;
    isPaid: boolean;
  };
}

export type PaidExpenseValidator = {
  validate: (
    params: PaidExpenseValidator.Params,
  ) => PaidExpenseValidator.Results;
};
