import { UserModel } from '@/entities/user-model';
import { UserRepository } from '@/repositories/user-repository';
import { AuthenticationService } from '@/services/authentication-service';

import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { UseCase } from '../use-case';

type CreateUserUseCaseRequest = Omit<UserModel, 'id'>;

type CreateUserUseCaseResponse = Omit<UserModel, 'password'>;

export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseRequest, CreateUserUseCaseResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      email,
      name,
      password: this.authenticationService.hashPassword(password),
    });

    return user;
  }
}
