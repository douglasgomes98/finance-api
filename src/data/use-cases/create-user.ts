import { CreateUser } from '@/domain/use-cases/create-user';
import { UseCase } from '@/domain/use-cases/use-case';
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error';

import { CreateUserRepository } from '../protocols/database/create-user-repository';
import { HasherProtocol } from '../protocols/cryptography/hasher-protocol';
import { FindUserByEmailRepository } from '../protocols/database/find-user-by-email-repository';

export class CreateUserUseCase
  implements UseCase<CreateUser.Params, CreateUser.Result>
{
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly hasherProtocol: HasherProtocol,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUser.Params): Promise<CreateUser.Result> {
    const userAlreadyExists = await this.findUserByEmailRepository.findByEmail({
      email,
    });

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.hasherProtocol.hash(password);

    const user = await this.createUserRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}
