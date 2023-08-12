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
import { z } from 'zod';

import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { makeCreateCreditCardUseCase } from '@/main/factories/use-cases/make-create-credit-card-use-case';
import { makeListCreditCardUseCase } from '@/main/factories/use-cases/make-list-credit-card-use-case';
import { makeDeleteCreditCardUseCase } from '@/main/factories/use-cases/make-delete-credit-card-use-case';

import { ApolloContext } from '../../types';
import { BankDataLoader } from '../bank/data-loader';
import { CreateCreditCardInput, CreditCard } from './types';

@Service()
@Resolver(() => CreditCard)
export class CreditCardResolver {
  constructor(private readonly bankDataLoader: BankDataLoader) {}

  @Authorized()
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

  @Authorized()
  @Query(() => [CreditCard])
  async listCreditCards(@Ctx() { userId }: ApolloContext) {
    const useCase = makeListCreditCardUseCase();

    return useCase.execute({ userId });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteCreditCard(@Arg('id') id: string) {
    const validator = z.object({
      id: z.string().nonempty().uuid(),
    });

    const safeValues = validator.parse({ id });

    const useCase = makeDeleteCreditCardUseCase();

    await useCase.execute(safeValues);

    return true;
  }

  @Authorized()
  @FieldResolver(() => Number)
  bank(@Root() creditCard: CreditCard) {
    return this.bankDataLoader.load(creditCard.bankId);
  }
}
