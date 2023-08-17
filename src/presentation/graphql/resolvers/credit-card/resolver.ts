import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Service } from 'typedi';

import { makeCreateCreditCardUseCase } from '@/main/factories/use-cases/make-create-credit-card-use-case';
import { makeListCreditCardUseCase } from '@/main/factories/use-cases/make-list-credit-card-use-case';
import { makeDeleteCreditCardUseCase } from '@/main/factories/use-cases/make-delete-credit-card-use-case';

import { ApolloContext } from '../../types';
import { BankDataLoader } from '../bank/data-loader';
import { CreateCreditCardInput, CreditCard } from './types';
import { CreditCardDataLoader } from './data-loader';
import { Bank } from '../bank/type';

@Service()
@Resolver(() => CreditCard)
export class CreditCardResolver {
  constructor(
    private readonly bankDataLoader: BankDataLoader,
    private readonly creditCardDataLoader: CreditCardDataLoader,
  ) {}

  @Authorized()
  @Mutation(() => CreditCard)
  async createCreditCard(
    @Arg('data') data: CreateCreditCardInput,
    @Ctx() { userId }: ApolloContext,
  ) {
    const useCase = makeCreateCreditCardUseCase();

    return useCase.execute({ ...data, userId });
  }

  @Authorized()
  @Query(() => [CreditCard])
  async listCreditCards(@Ctx() { userId }: ApolloContext) {
    const useCase = makeListCreditCardUseCase();

    return useCase.execute({ userId });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteCreditCard(
    @Arg('id') id: string,
    @Ctx() { userId }: ApolloContext,
  ) {
    const useCase = makeDeleteCreditCardUseCase();

    await useCase.execute({ creditCardId: id, userId });

    return true;
  }

  @Authorized()
  @Query(() => CreditCard)
  async findCreditCardById(@Arg('id') id: string) {
    return this.creditCardDataLoader.load(id);
  }

  @Authorized()
  @FieldResolver(() => Bank)
  bank(@Root() creditCard: CreditCard) {
    return this.bankDataLoader.load(creditCard.bankId);
  }
}
