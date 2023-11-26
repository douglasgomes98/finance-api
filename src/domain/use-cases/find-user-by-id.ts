import { UserModel } from '../entities/user-model';

export namespace FindUserById {
  export type Params = {
    id: string;
  };

  export type Result = UserModel;
}
