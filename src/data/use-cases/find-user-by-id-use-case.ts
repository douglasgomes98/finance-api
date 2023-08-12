import { FindUserById } from '@/domain/use-cases/find-user-by-id';
import { UseCase } from '@/domain/use-cases/use-case';
import { UserNotFoundError } from '@/domain/errors/user-not-found-error';

import { FindUserByIdRepository } from '../protocols/database/find-user-by-id-repository';

export class FindUserByIdUseCase
  implements UseCase<FindUserById.Params, FindUserById.Result>
{
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
  ) {}

  async execute({ id }: FindUserById.Params): Promise<FindUserById.Result> {
    const user = await this.findUserByIdRepository.findById({ id });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
