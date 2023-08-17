import { FindUserById } from '@/domain/use-cases/find-user-by-id';
import { UseCase } from '@/domain/use-cases/use-case';
import { UserNotFoundError } from '@/domain/errors/user-not-found-error';

import { FindUserByIdRepository } from '../protocols/database/find-user-by-id-repository';
import { FindUserByIdValidator } from '../protocols/validators/find-user-by-id-validator';

export class FindUserByIdUseCase
  implements UseCase<FindUserById.Params, FindUserById.Result>
{
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findUserByIdValidator: FindUserByIdValidator,
  ) {}

  async execute(params: FindUserById.Params): Promise<FindUserById.Result> {
    const { id } = this.findUserByIdValidator.validate(params);

    const user = await this.findUserByIdRepository.findById({ id });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
