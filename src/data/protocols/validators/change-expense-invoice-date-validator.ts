export namespace ChangeExpenseInvoiceDateValidator {
  export type Params = {
    id: string;
    increaseInvoiceMonth: number;
    userId: string;
  };

  export type Result = {
    id: string;
    increaseInvoiceMonth: number;
    userId: string;
  };
}

export type ChangeExpenseInvoiceDateValidator = {
  validate: (
    params: ChangeExpenseInvoiceDateValidator.Params,
  ) => ChangeExpenseInvoiceDateValidator.Result;
};
