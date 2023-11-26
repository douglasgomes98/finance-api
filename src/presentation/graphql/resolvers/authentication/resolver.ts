import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { makeAuthenticateUseCase } from '@/main/factories/use-cases/make-authenticate-use-case';

@Service()
@Resolver()
export class AuthenticationResolver {
  @Mutation(() => String)
  async authenticate(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const useCase = makeAuthenticateUseCase();

    const { accessToken } = await useCase.execute({ email, password });

    return accessToken;
  }
}
