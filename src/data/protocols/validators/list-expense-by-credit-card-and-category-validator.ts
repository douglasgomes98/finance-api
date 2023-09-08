export namespace ListExpenseByCreditCardAndCategoryValidator {
  export type Params = {
    creditCardId: string;
    userId: string;
    month: number;
    year: number;
  };

  export type Result = {
    creditCardId: string;
    userId: string;
    month: number;
    year: number;
  };
}

export type ListExpenseByCreditCardAndCategoryValidator = {
  validate: (
    params: ListExpenseByCreditCardAndCategoryValidator.Params,
  ) => ListExpenseByCreditCardAndCategoryValidator.Result;
};
