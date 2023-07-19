import { UserWithoutPassword } from '@/domain/entities/user-model';

export namespace FindUserByEmailRepository {
  export type Params = {
    email: string;
  };

  export type Result = UserWithoutPassword | null;
}

export type FindUserByEmailRepository = {
  findByEmail: (
    data: FindUserByEmailRepository.Params,
  ) => Promise<FindUserByEmailRepository.Result>;
};
