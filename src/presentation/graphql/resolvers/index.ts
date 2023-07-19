import { NonEmptyArray } from 'type-graphql';

import { CategoryResolver } from './category/resolver';
import { UserResolver } from './user/resolver';

export const resolvers: NonEmptyArray<Function> = [
  CategoryResolver,
  UserResolver,
];
