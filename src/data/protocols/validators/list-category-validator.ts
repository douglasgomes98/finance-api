export namespace ListCategoryValidator {
  export type Params = {
    userId: string;
  };

  export type Result = {
    userId: string;
  };
}

export type ListCategoryValidator = {
  validate: (
    params: ListCategoryValidator.Params,
  ) => ListCategoryValidator.Result;
};
