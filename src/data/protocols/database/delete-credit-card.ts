export namespace DeleteCreditCardRepository {
  export type Params = {
    id: string;
  };

  export type Result = void;
}

export type DeleteCreditCardRepository = {
  delete: (
    params: DeleteCreditCardRepository.Params,
  ) => Promise<DeleteCreditCardRepository.Result>;
};
