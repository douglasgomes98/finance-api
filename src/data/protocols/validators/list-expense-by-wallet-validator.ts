export namespace ListExpenseByWalletValidator {
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

export type ListExpenseByWalletValidator = {
  validate: (
    params: ListExpenseByWalletValidator.Params,
  ) => ListExpenseByWalletValidator.Result;
};
