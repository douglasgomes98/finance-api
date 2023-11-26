export namespace FindCategoryByIdValidator {
  export type Params = {
    id: string;
    userId?: string;
  };

  export type Result = {
    id: string;
    userId?: string;
  };
}

export type FindCategoryByIdValidator = {
  validate: (
    params: FindCategoryByIdValidator.Params,
  ) => FindCategoryByIdValidator.Result;
};
