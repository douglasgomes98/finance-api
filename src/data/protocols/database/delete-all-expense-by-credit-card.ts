export namespace DeleteAllExpenseByCreditCardRepository {
  export type Params = {
    creditCardId: string;
  };

  export type Result = void;
}

export type DeleteAllExpenseByCreditCardRepository = {
  deleteAllByCreditCard: (
    params: DeleteAllExpenseByCreditCard.Params,
  ) => Promise<DeleteAllExpenseByCreditCard.Result>;
};
