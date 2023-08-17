export namespace UpdateCategoryValidator {
  export type Params = {
    categoryId: string;
    userId: string;
    name: string;
    color: string;
  };

  export type Result = {
    categoryId: string;
    userId: string;
    name: string;
    color: string;
  };
}

export type UpdateCategoryValidator = {
  validate: (
    params: UpdateCategoryValidator.Params,
  ) => UpdateCategoryValidator.Result;
};
