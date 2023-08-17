export namespace ListCreditCardValidator {
  export type Params = {
    userId: string;
  };

  export type Result = {
    userId: string;
  };
}

export type ListCreditCardValidator = {
  validate: (
    params: ListCreditCardValidator.Params,
  ) => ListCreditCardValidator.Result;
};
