export namespace UpdateCreditCardLimitValidator {
  export type Params = {
    id: string;
  };

  export type Result = {
    id: string;
  };
}

export type UpdateCreditCardLimitValidator = {
  validate: (
    params: UpdateCreditCardLimitValidator.Params,
  ) => UpdateCreditCardLimitValidator.Result;
};
