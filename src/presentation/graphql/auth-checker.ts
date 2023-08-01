import { AuthCheckerInterface, ResolverData } from 'type-graphql';
import { Service } from 'typedi';

import { ApolloContext } from './types';

@Service()
export class AuthChecker implements AuthCheckerInterface<ApolloContext> {
  check(
    { context }: ResolverData<ApolloContext>,
    roles: string[],
  ): boolean | Promise<boolean> {
    if (!context.userId) return false;
    if (roles.length === 0) return true;

    // return roles.includes(context.user.role);
    return true;
  }
}
