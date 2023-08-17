export namespace DeleteCategoryValidator {
  export type Params = {
    categoryId: string;
    userId: string;
  };

  export type Result = {
    categoryId: string;
    userId: string;
  };
}

export type DeleteCategoryValidator = {
  validate: (
    params: DeleteCategoryValidator.Params,
  ) => DeleteCategoryValidator.Result;
};
