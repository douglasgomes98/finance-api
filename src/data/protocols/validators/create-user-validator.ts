export namespace CreateUserValidator {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = {
    name: string;
    email: string;
    password: string;
  };
}

export type CreateUserValidator = {
  validate: (params: CreateUserValidator.Params) => CreateUserValidator.Result;
};
