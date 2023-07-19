import { Field, ID, InputType, ObjectType } from 'type-graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field()
  color: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field()
  name: string;

  @Field()
  color: string;
}

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  color: string;
}
