import { UserModel } from '@/entities/user-model';

export type UserRepositoryDTO = Omit<UserModel, 'password'>;

export type UserCreateRepositoryDTO = Omit<UserModel, 'id'>;

export type UserRepository = {
  findById(id: string): Promise<UserRepositoryDTO | null>;
  findByEmail: (email: string) => Promise<UserRepositoryDTO | null>;
  create: (data: UserCreateRepositoryDTO) => Promise<UserRepositoryDTO>;
};
