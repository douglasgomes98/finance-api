import { UserModel } from '@/domain/entities/user-model';

export namespace FindUserByIdRepository {
  export type Params = {
    id: string;
  };

  export type Result = UserModel | null;
}

export type FindUserByIdRepository = {
  findById: (
    data: FindUserByIdRepository.Params,
  ) => Promise<FindUserByIdRepository.Result>;
};
