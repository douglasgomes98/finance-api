export namespace ListExpenseByWalletAndCategoryValidator {
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

export type ListExpenseByWalletAndCategoryValidator = {
  validate: (
    params: ListExpenseByWalletAndCategoryValidator.Params,
  ) => ListExpenseByWalletAndCategoryValidator.Result;
};
