import { UserModel } from './user-model';

export type UserToken = Pick<UserModel, 'id' | 'name' | 'email'>;
