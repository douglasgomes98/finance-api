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
import { makeCreateExpenseUseCase } from '@/main/factories/use-cases/make-create-expense-use-case';
import { makeListExpenseByCreditCardUseCase } from '@/main/factories/use-cases/make-list-expense-by-credit-card-use-case';
import { makeDeleteExpenseUseCase } from '@/main/factories/use-cases/make-delete-expense-use-case';

import { ApolloContext } from '../../types';
import { ExpenseDataLoader } from './data-loader';
import {
  CreateExpenseInput,
  Expense,
  ListExpenseByCreditCardFilter,
} from './types';
import { User } from '../user/type';
import { UserDataLoader } from '../user/data-loader';
import { CreditCard } from '../credit-card/types';
import { Category } from '../category/type';
import { CategoryDataLoader } from '../category/data-loader';
import { CreditCardDataLoader } from '../credit-card/data-loader';

@Resolver(() => Expense)
@Service()
export class ExpenseResolver {
  constructor(
    private readonly expenseDataLoader: ExpenseDataLoader,
    private readonly userDataLoader: UserDataLoader,
    private readonly creditCardDataLoader: CreditCardDataLoader,
    private readonly categoryDataLoader: CategoryDataLoader,
  ) {}

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

  @Authorized()
  @Mutation(() => Boolean)
  async deleteExpense(@Arg('id') id: string, @Ctx() { userId }: ApolloContext) {
    const validator = z.object({
      id: z.string().uuid(),
    });

    const safeValues = validator.parse({ id });

    const useCase = makeDeleteExpenseUseCase();

    await useCase.execute({ expenseId: safeValues.id, userId });

    return true;
  }

  @Authorized()
  @FieldResolver(() => User)
  async user(@Root() expense: Expense) {
    return this.userDataLoader.load(expense.userId);
  }

  @Authorized()
  @FieldResolver(() => CreditCard)
  async creditCard(@Root() expense: Expense) {
    return this.creditCardDataLoader.load(expense.creditCardId);
  }

  @Authorized()
  @FieldResolver(() => Category)
  async category(@Root() expense: Expense) {
    return this.categoryDataLoader.load(expense.categoryId);
  }
}
