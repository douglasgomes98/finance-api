import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { makeListBankUseCase } from '@/main/factories/use-cases/make-list-bank-use-case';

import { BankDataLoader } from './data-loader';
import { Bank } from './type';

@Service()
@Resolver()
export class BankResolver {
  constructor(private readonly bankDataLoader: BankDataLoader) {}

  @Authorized()
  @Query(() => [Bank])
  async listBanks() {
    const useCase = makeListBankUseCase();

    return useCase.execute();
  }

  @Authorized()
  @Query(() => Bank)
  async findBankById(@Arg('id') id: string) {
    return this.bankDataLoader.load(id);
  }
}
