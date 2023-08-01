import { Authorized, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { makeListBankUseCase } from '@/main/factories/use-cases/make-list-bank-use-case';

import { Bank } from './type';

@Service()
@Resolver()
export class BankResolver {
  @Authorized()
  @Query(() => [Bank])
  async listBanks() {
    const useCase = makeListBankUseCase();

    return useCase.execute();
  }
}
