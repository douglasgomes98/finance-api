export namespace CreateExpenseValidator {
  export type Params = {
    name: string;
    value: number;
    purchaseDate: Date;
    isFixed: boolean;
    categoryId: string;
    creditCardId: string;
    userId: string;
    installments?: number;
  };

  export type Result = {
    name: string;
    value: number;
    purchaseDate: Date;
    isFixed: boolean;
    categoryId: string;
    creditCardId: string;
    userId: string;
    installments?: number;
  };
}

export type CreateExpenseValidator = {
  validate: (
    params: CreateExpenseValidator.Params,
  ) => CreateExpenseValidator.Result;
};
