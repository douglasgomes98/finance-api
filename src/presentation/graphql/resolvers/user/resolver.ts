import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { makeCreateUserUseCase } from '@/main/factories/use-cases/make-create-user-use-case';

import { CreateUserInput, User } from './type';
import { UserDataLoader } from './data-loader';

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly userDataLoader: UserDataLoader) {}

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput) {
    const useCase = makeCreateUserUseCase();

    return useCase.execute(data);
  }

  @Authorized()
  @Query(() => User)
  async findUserById(@Arg('id') id: string) {
    return this.userDataLoader.load(id);
  }
}
