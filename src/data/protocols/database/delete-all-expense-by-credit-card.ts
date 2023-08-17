export namespace DeleteAllExpenseByCreditCardRepository {
  export type Params = {
    creditCardId: string;
  };

  export type Result = void;
}

export type DeleteAllExpenseByCreditCardRepository = {
  deleteAllByCreditCard: (
    params: DeleteAllExpenseByCreditCardRepository.Params,
  ) => Promise<DeleteAllExpenseByCreditCardRepository.Result>;
};
