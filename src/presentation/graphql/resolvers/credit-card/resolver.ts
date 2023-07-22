import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { z } from 'zod';

import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { makeCreateCreditCardUseCase } from '@/main/factories/use-cases/make-create-credit-card-use-case';
import { makeListCreditCardUseCase } from '@/main/factories/use-cases/make-list-credit-card-use-case';

import { CreateCreditCardInput, CreditCard } from './types';
import { ApolloContext } from '../../types';

@Service()
@Resolver()
export class CreditCardResolver {
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
      color: z
        .string()
        .length(7)
        .regex(/^#[0-9a-f]{6}$/i)
        .trim(),
      limit: z.number().positive(),
      dueDay: z.number().min(1).max(31),
      closingDay: z.number().min(1).max(31),
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
}
