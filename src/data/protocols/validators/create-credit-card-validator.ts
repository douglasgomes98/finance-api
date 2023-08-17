export namespace CreateCreditCardValidator {
  export type Params = {
    name: string;
    dueDay: number;
    closingDay: number;
    limit: number;
    userId: string;
    bankId: string;
  };

  export type Result = {
    name: string;
    dueDay: number;
    closingDay: number;
    limit: number;
    userId: string;
    bankId: string;
  };
}

export type CreateCreditCardValidator = {
  validate: (
    params: CreateCreditCardValidator.Params,
  ) => CreateCreditCardValidator.Result;
};
