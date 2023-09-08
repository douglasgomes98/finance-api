import { Field, ID, InputType, ObjectType } from 'type-graphql';

import { User } from '../user/type';
import { CreditCard } from '../credit-card/types';
import { Category } from '../category/type';

@InputType()
export class CreateExpenseInput {
  @Field()
  name: string;

  @Field()
  value: number;

  @Field()
  purchaseDate: Date;

  @Field()
  isFixed: boolean;

  @Field()
  isIgnored: boolean;

  @Field()
  categoryId: string;

  @Field()
  creditCardId: string;

  @Field({ nullable: true })
  installments: number;
}

@ObjectType()
export class Expense {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  value: number;

  @Field()
  purchaseDate: Date;

  @Field()
  invoiceDate: Date;

  @Field()
  isPaid: boolean;

  @Field()
  isIgnored: boolean;

  @Field()
  isFixed: boolean;

  @Field()
  installmentsIdentifier: string;

  @Field()
  categoryId: string;

  @Field()
  creditCardId: string;

  @Field()
  userId: string;

  @Field()
  user: User;

  @Field()
  creditCard: CreditCard;

  @Field()
  category: Category;
}

@ObjectType()
export class ExpenseList {
  @Field(() => [Expense])
  expenses: Expense[];

  @Field()
  amount: number;
}

@ObjectType()
export class ExpenseListByCategoryDetails {
  @Field()
  category: Category;

  @Field(() => [Expense])
  expenses: Expense[];

  @Field()
  amount: number;
}

@ObjectType()
export class ExpenseListByCategory {
  @Field(() => [ExpenseListByCategoryDetails])
  details: ExpenseListByCategoryDetails[];

  @Field()
  amount: number;
}

@InputType()
export class ListExpenseByCreditCardFilter {
  @Field()
  creditCardId: string;

  @Field()
  month: number;

  @Field()
  year: number;
}

@InputType()
export class ListExpenseFilter {
  @Field()
  month: number;

  @Field()
  year: number;
}

@InputType()
export class ExpenseListByCategoryFilter {
  @Field()
  month: number;

  @Field()
  year: number;
}

@InputType()
export class ListExpenseByCreditCardAndCategoryFilter {
  @Field()
  creditCardId: string;

  @Field()
  month: number;

  @Field()
  year: number;
}
