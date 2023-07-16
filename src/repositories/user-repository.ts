import { UserModel } from '@/entities/user-model';

export type UserRepositoryDTO = Pick<UserModel, 'id' | 'email' | 'name'>;

export type UserCreateRepositoryDTO = Pick<
  UserModel,
  'email' | 'name' | 'password'
>;

export type UserRepository = {
  findByEmail: (email: string) => Promise<UserRepositoryDTO | null>;
  create: (data: UserCreateRepositoryDTO) => Promise<UserRepositoryDTO>;
};
