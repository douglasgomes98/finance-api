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
    const useCase = makeCreateExpenseUseCase();

    return useCase.execute({ ...data, userId });
  }

  @Authorized()
  @Query(() => [Expense])
  async listExpenseByCreditCard(
    @Arg('filter') filter: ListExpenseByCreditCardFilter,
  ) {
    const useCase = makeListExpenseByCreditCardUseCase();

    return useCase.execute(filter);
  }

  @Authorized()
  @Query(() => Expense)
  async findExpenseById(@Arg('id') id: string) {
    return this.expenseDataLoader.load(id);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteExpense(@Arg('id') id: string, @Ctx() { userId }: ApolloContext) {
    const useCase = makeDeleteExpenseUseCase();

    await useCase.execute({ expenseId: id, userId });

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
