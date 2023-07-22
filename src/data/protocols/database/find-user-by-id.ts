import { UserWithoutPassword } from '@/domain/entities/user-model';

export namespace FindUserByIdRepository {
  export type Params = {
    id: string;
  };

  export type Result = UserWithoutPassword | null;
}

export type FindUserByIdRepository = {
  findById: (
    data: FindUserByIdRepository.Params,
  ) => Promise<FindUserByIdRepository.Result>;
};
