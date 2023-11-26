import { UserModel } from './user-model';

export type UserTokenModel = Pick<UserModel, 'id' | 'name' | 'email'>;
