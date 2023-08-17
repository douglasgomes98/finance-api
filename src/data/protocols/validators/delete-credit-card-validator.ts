export namespace DeleteCreditCardValidator {
  export type Params = {
    creditCardId: string;
    userId: string;
  };

  export type Result = {
    creditCardId: string;
    userId: string;
  };
}

export type DeleteCreditCardValidator = {
  validate: (
    params: DeleteCreditCardValidator.Params,
  ) => DeleteCreditCardValidator.Result;
};
