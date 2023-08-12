import { Arg, Authorized, Ctx, Mutation, Query } from 'type-graphql';
import { Service } from 'typedi';
import { z } from 'zod';

import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { makeCreateExpenseUseCase } from '@/main/factories/use-cases/make-create-expense-use-case';
import { makeListExpenseByCreditCardUseCase } from '@/main/factories/use-cases/make-list-expense-by-credit-card-use-case';

import { ApolloContext } from '../../types';
import { ExpenseDataLoader } from './data-loader';
import {
  CreateExpenseInput,
  Expense,
  ListExpenseByCreditCardFilter,
} from './types';

@Service()
export class ExpenseResolver {
  constructor(private readonly expenseDataLoader: ExpenseDataLoader) {}

  @Authorized()
  @Mutation(() => Expense)
  async createExpense(
    @Arg('data') data: CreateExpenseInput,
    @Ctx() { userId }: ApolloContext,
  ) {
    const formatterAdapter = new FormatterAdapter();

    const validator = z.object({
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(formatterAdapter.normalizeName),
      value: z.number().positive(),
      purchaseDate: z
        .string()
        .nonempty()
        .transform(value => new Date(value)),
      isFixed: z.boolean(),
      categoryId: z.string().nonempty().uuid(),
      creditCardId: z.string().nonempty().uuid(),
      installments: z.number().int().min(0),
    });

    const safeValues = validator.parse({ data });

    const useCase = makeCreateExpenseUseCase();

    return useCase.execute({ ...safeValues, userId });
  }

  @Authorized()
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

  @Authorized()
  @Query(() => Expense)
  async findExpenseById(@Arg('id') id: string) {
    const validator = z.object({
      id: z.string().uuid(),
    });

    const safeValues = validator.parse({ id });

    return this.expenseDataLoader.load(safeValues.id);
  }
}
