import Dataloader from 'dataloader';
import { Service } from 'typedi';

import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
import { CreditCardModel } from '@/domain/entities/credit-card-model';
import { makeFindCreditCardByIdUseCase } from '@/main/factories/use-cases/make-find-credit-card-by-id-use-case';

@Service()
export class CreditCardDataLoader {
  private readonly loader;

  private readonly useCase: FindCreditCardByIdUseCase;

  constructor() {
    this.useCase = makeFindCreditCardByIdUseCase();
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
    return new Dataloader<string, CreditCardModel | null, string>(
      async keys => {
        const items = await Promise.all(keys.map(key => this.getItem(key)));

        return keys.map(key => items.find(user => user?.id === key) || null);
      },
    );
  }

  async load(key: string) {
    return this.loader.load(key);
  }
}
