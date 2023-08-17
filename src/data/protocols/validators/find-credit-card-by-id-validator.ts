export namespace FindCreditCardByIdValidator {
  export type Params = {
    id: string;
  };

  export type Result = {
    id: string;
  };
}

export type FindCreditCardByIdValidator = {
  validate: (
    params: FindCreditCardByIdValidator.Params,
  ) => FindCreditCardByIdValidator.Result;
};
