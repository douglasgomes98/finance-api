import { UserWithoutPassword } from '../entities/user-model';

export namespace FindUserById {
  export type Params = {
    id: string;
  };

  export type Result = UserWithoutPassword;
}
