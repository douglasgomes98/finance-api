export namespace ListExpenseByCreditCardValidator {
  export type Params = {
    creditCardId: string;
    month: number;
    year: number;
    userId: string;
  };

  export type Result = {
    creditCardId: string;
    month: number;
    year: number;
    userId: string;
  };
}

export type ListExpenseByCreditCardValidator = {
  validate: (
    params: ListExpenseByCreditCardValidator.Params,
  ) => ListExpenseByCreditCardValidator.Result;
};
