import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Service } from 'typedi';
import { z } from 'zod';

import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { makeCreateCreditCardUseCase } from '@/main/factories/use-cases/make-create-credit-card-use-case';
import { makeListCreditCardUseCase } from '@/main/factories/use-cases/make-list-credit-card-use-case';

import { ApolloContext } from '../../types';
import { BankDataLoader } from '../bank/data-loader';
import { CreateCreditCardInput, CreditCard } from './types';

@Service()
@Resolver(() => CreditCard)
export class CreditCardResolver {
  constructor(private readonly bankDataLoader: BankDataLoader) {}

  @Mutation(() => CreditCard)
  async createCreditCard(
    @Arg('data') data: CreateCreditCardInput,
    @Ctx() { userId }: ApolloContext,
  ) {
    const formatterAdapter = new FormatterAdapter();
    // TODO: Move validation to a dependency
    const validator = z.object({
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(formatterAdapter.normalizeName),
      limit: z.number().positive(),
      dueDay: z.number().min(1).max(31),
      closingDay: z.number().min(1).max(31),
      bankId: z.string().nonempty().uuid(),
    });

    const safeValues = validator.parse(data);

    const useCase = makeCreateCreditCardUseCase();

    return useCase.execute({ ...safeValues, userId });
  }

  @Query(() => [CreditCard])
  async listCreditCards(@Ctx() { userId }: ApolloContext) {
    const useCase = makeListCreditCardUseCase();

    return useCase.execute({ userId });
  }

  @FieldResolver(() => Number)
  bank(@Root() creditCard: CreditCard) {
    return this.bankDataLoader.load(creditCard.bankId);
  }
}
