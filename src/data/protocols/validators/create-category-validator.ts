export namespace CreateCategoryValidator {
  export type Params = {
    userId: string;
    name: string;
    color: string;
  };

  export type Result = {
    userId: string;
    name: string;
    color: string;
  };
}

export type CreateCategoryValidator = {
  validate: (
    params: CreateCategoryValidator.Params,
  ) => CreateCategoryValidator.Result;
};
