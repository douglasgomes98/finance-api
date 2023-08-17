export namespace FindBankByIdValidator {
  export type Params = {
    id: string;
  };

  export type Result = {
    id: string;
  };
}

export type FindBankByIdValidator = {
  validate: (
    params: FindBankByIdValidator.Params,
  ) => FindBankByIdValidator.Result;
};
