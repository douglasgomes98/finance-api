import Dataloader from 'dataloader';
import { Service } from 'typedi';

import { FindBankByIdUseCase } from '@/data/use-cases/find-bank-by-id-use-case';
import { BankModel } from '@/domain/entities/bank-model';
import { makeFindBankByIdUseCase } from '@/main/factories/use-cases/make-find-bank-by-id-use-case';

@Service()
export class BankDataLoader {
  private readonly loader;

  private readonly useCase: FindBankByIdUseCase;

  constructor() {
    this.useCase = makeFindBankByIdUseCase();
    this.loader = this.makeLoader();
  }

  private async getItem(key: string) {
    try {
      const item = await this.useCase.execute({ id: key });

      return item;
    } catch (error) {
      return null;
    }
  }

  private makeLoader() {
    return new Dataloader<string, BankModel | null, string>(async keys => {
      const items = await Promise.all(keys.map(key => this.getItem(key)));

      return keys.map(key => items.find(user => user?.id === key) || null);
    });
  }

  async load(key: string) {
    return this.loader.load(key);
  }
}
