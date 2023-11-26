export namespace UpdateCreditCardLimitValidator {
  export type Params = {
    id: string;
    userId: string;
  };

  export type Result = {
    id: string;
    userId: string;
  };
}

export type UpdateCreditCardLimitValidator = {
  validate: (
    params: UpdateCreditCardLimitValidator.Params,
  ) => UpdateCreditCardLimitValidator.Result;
};
