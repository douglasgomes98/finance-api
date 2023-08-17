export namespace FindCategoryByIdValidator {
  export type Params = {
    id: string;
  };

  export type Result = {
    id: string;
  };
}

export type FindCategoryByIdValidator = {
  validate: (
    params: FindCategoryByIdValidator.Params,
  ) => FindCategoryByIdValidator.Result;
};
