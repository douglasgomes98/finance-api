import { UserModel, UserWithoutPassword } from '../entities/user-model';

export namespace CreateUser {
  export type Params = Omit<UserModel, 'id'>;

  export type Result = UserWithoutPassword;
}
