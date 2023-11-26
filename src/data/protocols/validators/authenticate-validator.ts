export namespace AuthenticateValidator {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    email: string;
    password: string;
  };
}

export type AuthenticateValidator = {
  validate: (
    params: AuthenticateValidator.Params,
  ) => AuthenticateValidator.Result;
};
