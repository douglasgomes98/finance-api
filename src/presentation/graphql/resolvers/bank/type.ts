import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Bank {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  color: string;
}
