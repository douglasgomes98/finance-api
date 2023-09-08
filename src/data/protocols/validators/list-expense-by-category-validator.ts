export namespace ListExpenseByCategoryValidator {
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

export type ListExpenseByCategoryValidator = {
  validate: (
    params: ListExpenseByCategoryValidator.Params,
  ) => ListExpenseByCategoryValidator.Result;
};
