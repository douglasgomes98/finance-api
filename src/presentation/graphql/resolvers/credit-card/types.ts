import { Field, ID, InputType, ObjectType } from 'type-graphql';

import { Bank } from '../bank/type';

@InputType()
export class CreateCreditCardInput {
  @Field()
  name: string;

  @Field()
  limit: number;

  @Field()
  dueDay: number;

  @Field()
  closingDay: number;

  @Field()
  bankId: string;
}

@ObjectType()
export class CreditCard {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  dueDay: number;

  @Field()
  closingDay: number;

  @Field()
  limit: number;

  @Field()
  limitAvailable: number;

  @Field()
  limitUsed: number;

  @Field()
  percentLimitUsed: number;

  @Field()
  userId: string;

  @Field()
  bankId: string;

  @Field(() => Bank)
  bank: Bank;
}
