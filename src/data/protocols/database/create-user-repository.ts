import { UserModel } from '@/domain/entities/user-model';

export namespace CreateUserRepository {
  export type Params = Omit<UserModel, 'id'>;

  export type Result = UserModel;
}

export type CreateUserRepository = {
  create: (
    data: CreateUserRepository.Params,
  ) => Promise<CreateUserRepository.Result>;
};
