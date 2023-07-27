import { Field, ID, InputType, ObjectType } from 'type-graphql';

@InputType()
export class CreateCreditCardInput {
  @Field()
  name: string;

  @Field()
  dueDay: number;

  @Field()
  closingDay: number;

  @Field()
  limit: number;

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
  color: string;

  @Field()
  limit: number;

  @Field()
  dueDay: number;

  @Field()
  closingDay: number;

  @Field()
  userId: string;
}
