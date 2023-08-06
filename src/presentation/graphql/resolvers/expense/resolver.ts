import { Arg, Ctx, Mutation, Query } from 'type-graphql';
import { Service } from 'typedi';
import { z } from 'zod';

import { makeCreateExpenseUseCase } from '@/main/factories/use-cases/make-create-expense-use-case';
import { makeListExpenseByCreditCardUseCase } from '@/main/factories/use-cases/make-list-expense-by-credit-card-use-case';

import {
  CreateExpenseInput,
  Expense,
  ListExpenseByCreditCardFilter,
} from './types';
import { ApolloContext } from '../../types';

@Service()
export class ExpenseResolver {
  @Mutation(() => Expense)
  async createExpense(
    @Arg('data') data: CreateExpenseInput,
    @Ctx() { userId }: ApolloContext,
  ) {
    const useCase = makeCreateExpenseUseCase();

    return useCase.execute({ ...data, userId });
  }

  @Query(() => [Expense])
  async listExpenseByCreditCard(
    @Arg('filter') filter: ListExpenseByCreditCardFilter,
  ) {
    const validator = z.object({
      creditCardId: z.string().uuid(),
      month: z.number().int().min(1).max(12),
      year: z.number().int().min(0),
    });

    const safeValues = validator.parse(filter);

    const useCase = makeListExpenseByCreditCardUseCase();

    return useCase.execute(safeValues);
  }
}
