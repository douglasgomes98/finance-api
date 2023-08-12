import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { z } from 'zod';

import { makeCreateUserUseCase } from '@/main/factories/use-cases/make-create-user-use-case';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';

import { CreateUserInput, User } from './type';
import { UserDataLoader } from './data-loader';

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly userDataLoader: UserDataLoader) {}

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput) {
    const formatterAdapter = new FormatterAdapter();
    // TODO: Move validation to a dependency
    const validator = z.object({
      email: z.string().email().trim().toLowerCase(),
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(formatterAdapter.normalizeName),
      password: z.string().trim().min(8),
    });

    const safeValues = validator.parse(data);

    const useCase = makeCreateUserUseCase();

    return useCase.execute(safeValues);
  }

  @Authorized()
  @Query(() => User)
  async findUserById(@Arg('id') id: string) {
    const validator = z.object({
      id: z.string().uuid(),
    });

    const safeValues = validator.parse({ id });

    return this.userDataLoader.load(safeValues.id);
  }
}
