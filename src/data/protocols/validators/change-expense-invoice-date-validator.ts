export namespace ChangeExpenseInvoiceDateValidator {
  export type Params = {
    id: string;
    increaseInvoiceMonth: number;
  };

  export type Result = {
    id: string;
    increaseInvoiceMonth: number;
  };
}

export type ChangeExpenseInvoiceDateValidator = {
  validate: (
    params: ChangeExpenseInvoiceDateValidator.Params,
  ) => ChangeExpenseInvoiceDateValidator.Result;
};
