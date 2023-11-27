export namespace FindCreditCardByIdValidator {
  export type Params = {
    id: string;
    userId?: string;
  };

  export type Result = {
    id: string;
    userId?: string;
  };
}

export type FindCreditCardByIdValidator = {
  validate: (
    params: FindCreditCardByIdValidator.Params,
  ) => FindCreditCardByIdValidator.Result;
};
