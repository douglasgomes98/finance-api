import { Field, ID, InputType, ObjectType } from 'type-graphql';

@InputType()
export class CreateExpenseInput {
  @Field()
  name: string;

  @Field()
  value: number;

  @Field()
  date: Date;

  @Field()
  isFixed: boolean;

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
  date: Date;

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
}
