export namespace FindUserByIdValidator {
  export type Params = {
    id: string;
  };

  export type Result = {
    id: string;
  };
}

export type FindUserByIdValidator = {
  validate: (
    params: FindUserByIdValidator.Params,
  ) => FindUserByIdValidator.Result;
};
