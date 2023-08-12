export namespace DeleteExpenseRepository {
  export type Params = {
    id: string;
  };

  export type Result = void;
}

export type DeleteExpenseRepository = {
  delete: (
    data: DeleteExpenseRepository.Params,
  ) => Promise<DeleteExpenseRepository.Result>;
};
