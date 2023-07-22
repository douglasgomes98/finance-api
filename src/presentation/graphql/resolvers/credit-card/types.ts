import { Field, ID, InputType, ObjectType } from 'type-graphql';

@InputType()
export class CreateCreditCardInput {
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
