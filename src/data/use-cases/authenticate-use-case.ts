import { Authenticate } from '@/domain/use-cases/authenticate';
import { UseCase } from '@/domain/use-cases/use-case';
import { AuthenticationInvalidError } from '@/domain/errors/authentication-invalid-error';

import { FindUserByEmailRepository } from '../protocols/database/find-user-by-email-repository';
import { AuthenticateValidator } from '../protocols/validators/authenticate-validator';
import { HashComparerProtocol } from '../protocols/cryptography/hash-comparer-protocol';
import { CreateSessionProtocol } from '../protocols/cryptography/create-session-protocol';

export class AuthenticateUseCase
  implements UseCase<Authenticate.Params, Authenticate.Result>
{
  constructor(
    private readonly authenticateValidator: AuthenticateValidator,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly hashComparerProtocol: HashComparerProtocol,
    private readonly createSessionProtocol: CreateSessionProtocol,
  ) {}

  async execute(params: Authenticate.Params): Promise<Authenticate.Result> {
    const { email, password } = this.authenticateValidator.validate(params);

    const user = await this.findUserByEmailRepository.findByEmail({ email });

    if (!user) {
      throw new AuthenticationInvalidError();
    }

    const isValidPassword = await this.hashComparerProtocol.compare(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new AuthenticationInvalidError();
    }

    const accessToken = await this.createSessionProtocol.create({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      accessToken,
    };
  }
}
