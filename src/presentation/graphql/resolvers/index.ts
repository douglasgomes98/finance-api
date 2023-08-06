import { NonEmptyArray } from 'type-graphql';

import { CategoryResolver } from './category/resolver';
import { UserResolver } from './user/resolver';
import { CreditCardResolver } from './credit-card/resolver';
import { BankResolver } from './bank/resolver';
import { ExpenseResolver } from './expense/resolver';

export const resolvers: NonEmptyArray<Function> = [
  CategoryResolver,
  UserResolver,
  CreditCardResolver,
  BankResolver,
  ExpenseResolver,
];
