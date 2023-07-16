import { UserModel } from '@/entities/user-model';
import { UserRepository } from '@/repositories/user-repository';

import { UseCase } from '../use-case';
import { UserNotFoundError } from './errors/user-not-found-error';

type FindUserByIdUseCaseRequest = {
  id: string;
};

type FindUserByIdUseCaseResponse = Omit<UserModel, 'password'>;

export class FindUserByIdUseCase
  implements UseCase<FindUserByIdUseCaseRequest, FindUserByIdUseCaseResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    data: FindUserByIdUseCaseRequest,
  ): Promise<FindUserByIdUseCaseResponse> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
