export namespace Authenticate {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
  };
}
