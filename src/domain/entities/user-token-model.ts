import { UserModel } from './user-model';

export type UserTokenModel = Omit<UserModel, 'password'>;
