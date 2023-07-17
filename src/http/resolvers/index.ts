import { NonEmptyArray } from 'type-graphql';

import { CategoryResolver } from './category/resolver';

export const resolvers: NonEmptyArray<Function> = [CategoryResolver];
