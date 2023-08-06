export namespace DeleteCategoryRepository {
  export type Params = {
    id: string;
  };

  export type Result = void;
}

export type DeleteCategoryRepository = {
  delete: (
    data: DeleteCategoryRepository.Params,
  ) => Promise<DeleteCategoryRepository.Result>;
};
