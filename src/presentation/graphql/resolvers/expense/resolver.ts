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
import { makeIgnoreExpenseUseCase } from '@/main/factories/use-cases/make-ignore-expense-use-case';
import { makePaidExpenseUseCase } from '@/main/factories/use-cases/make-paid-expense-use-case';
import { makeChangeExpenseInvoiceDateUseCase } from '@/main/factories/use-cases/make-change-expense-invoice-date-use-case';
import { makeListExpenseUseCase } from '@/main/factories/use-cases/make-list-expense-use-case';
import { makeListExpenseByCategoryUseCase } from '@/main/factories/use-cases/make-list-expense-by-category-use-case';
import { makeListExpenseByCreditCardAndCategoryUseCase } from '@/main/factories/use-cases/make-list-expense-by-credit-card-and-category-use-case';
import { makeUpdateExpenseUseCase } from '@/main/factories/use-cases/make-update-expense-use-case';
import { makeListExpenseByWalletUseCase } from '@/main/factories/use-cases/make-list-expense-by-wallet-use-case';
import { makeListExpenseByWalletAndCategoryUseCase } from '@/main/factories/use-cases/make-list-expense-by-wallet-and-category-use-case';

import { ApolloContext } from '../../types';
import { ExpenseDataLoader } from './data-loader';
import {
  CreateExpenseInput,
  Expense,
  ExpenseList,
  ExpenseListByCategory,
  ExpenseListByCategoryFilter,
  ListExpenseByCreditCardAndCategoryFilter,
  ListExpenseByCreditCardFilter,
  ListExpenseFilter,
  UpdateExpenseInput,
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
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makeCreateExpenseUseCase();

    return useCase.execute({ ...data, userId: user!.id });
  }

  @Authorized()
  @Query(() => ExpenseList)
  async listExpenseByCreditCard(
    @Arg('filter') filter: ListExpenseByCreditCardFilter,
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makeListExpenseByCreditCardUseCase();

    return useCase.execute({ ...filter, userId: user!.id });
  }

  @Authorized()
  @Query(() => ExpenseList)
  async listExpense(
    @Arg('filter') filter: ListExpenseFilter,
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makeListExpenseUseCase();

    return useCase.execute({ ...filter, userId: user!.id });
  }

  @Authorized()
  @Query(() => ExpenseListByCategory)
  async listExpenseByCategoryAndCreditCard(
    @Arg('filter') filter: ListExpenseByCreditCardAndCategoryFilter,
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makeListExpenseByCreditCardAndCategoryUseCase();

    return useCase.execute({ ...filter, userId: user!.id });
  }

  @Authorized()
  @Query(() => ExpenseListByCategory)
  async listExpenseByCategory(
    @Arg('filter') filter: ExpenseListByCategoryFilter,
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makeListExpenseByCategoryUseCase();

    return useCase.execute({ ...filter, userId: user!.id });
  }

  @Authorized()
  @Query(() => ExpenseList)
  async listExpenseByWallet(
    @Arg('filter') filter: ListExpenseFilter,
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makeListExpenseByWalletUseCase();

    return useCase.execute({ ...filter, userId: user!.id });
  }

  @Authorized()
  @Query(() => ExpenseListByCategory)
  async listExpenseByWalletAndCategory(
    @Arg('filter') filter: ExpenseListByCategoryFilter,
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makeListExpenseByWalletAndCategoryUseCase();

    return useCase.execute({
      ...filter,
      userId: user!.id,
    });
  }

  @Authorized()
  @Query(() => Expense)
  async findExpenseById(@Arg('id') id: string) {
    return this.expenseDataLoader.load(id);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteExpense(
    @Arg('id') id: string,
    @Ctx() { user }: ApolloContext,
    @Arg('all', { nullable: true }) all?: boolean,
  ) {
    const useCase = makeDeleteExpenseUseCase();

    await useCase.execute({ expenseId: id, userId: user!.id, all });

    return true;
  }

  @Authorized()
  @Mutation(() => Expense)
  async ignoreExpense(
    @Arg('id') id: string,
    @Arg('isIgnored') isIgnored: boolean,
    @Ctx() { user }: ApolloContext,
    @Arg('all', { nullable: true }) all?: boolean,
  ) {
    const useCase = makeIgnoreExpenseUseCase();

    return useCase.execute({ id, isIgnored, all, userId: user!.id });
  }

  @Authorized()
  @Mutation(() => Expense)
  async paidExpense(
    @Arg('id') id: string,
    @Arg('isPaid') isPaid: boolean,
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makePaidExpenseUseCase();

    return useCase.execute({ id, isPaid, userId: user!.id });
  }

  @Authorized()
  @Mutation(() => Expense)
  async changeExpenseInvoiceDate(
    @Arg('id') id: string,
    @Arg('increaseInvoiceMonth') increaseInvoiceMonth: number,
    @Ctx() { user }: ApolloContext,
  ) {
    const useCase = makeChangeExpenseInvoiceDateUseCase();

    return useCase.execute({ id, increaseInvoiceMonth, userId: user!.id });
  }

  @Authorized()
  @Mutation(() => Expense)
  async updateExpense(
    @Arg('id') id: string,
    @Arg('data') data: UpdateExpenseInput,
    @Ctx() { user }: ApolloContext,
    @Arg('all', { nullable: true }) all?: boolean,
  ) {
    const useCase = makeUpdateExpenseUseCase();

    return useCase.execute({ id, data, all, userId: user!.id });
  }

  @Authorized()
  @FieldResolver(() => User)
  async user(@Root() expense: Expense) {
    return this.userDataLoader.load(expense.userId);
  }

  @Authorized()
  @FieldResolver(() => CreditCard, { nullable: true })
  async creditCard(@Root() expense: Expense) {
    if (!expense.creditCardId) return null;

    return this.creditCardDataLoader.load(expense.creditCardId);
  }

  @Authorized()
  @FieldResolver(() => Category)
  async category(@Root() expense: Expense) {
    return this.categoryDataLoader.load(expense.categoryId);
  }
}
