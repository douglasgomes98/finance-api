import { UserModel, UserWithoutPassword } from '@/domain/entities/user-model';

export namespace CreateUserRepository {
  export type Params = Omit<UserModel, 'id'>;

  export type Result = UserWithoutPassword;
}

export type CreateUserRepository = {
  create: (
    data: CreateUserRepository.Params,
  ) => Promise<CreateUserRepository.Result>;
};
