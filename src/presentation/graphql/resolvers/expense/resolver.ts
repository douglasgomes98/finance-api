import { Arg, Ctx, Mutation } from 'type-graphql';
import { Service } from 'typedi';

import { makeCreateExpenseUseCase } from '@/main/factories/use-cases/make-create-expense-use-case';

import { CreateExpenseInput, Expense } from './types';
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
}
