import Dataloader from 'dataloader';
import { Service } from 'typedi';

import { FindExpenseByIdUseCase } from '@/data/use-cases/find-expense-by-id-use-case';
import { ExpenseModel } from '@/domain/entities/expense-model';
import { makeFindExpenseByIdUseCase } from '@/main/factories/use-cases/make-find-expense-by-id-use-case';

@Service()
export class ExpenseDataLoader {
  private readonly loader;

  private readonly useCase: FindExpenseByIdUseCase;

  constructor() {
    this.useCase = makeFindExpenseByIdUseCase();
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
    return new Dataloader<string, ExpenseModel | null, string>(async keys => {
      const items = await Promise.all(keys.map(key => this.getItem(key)));

      return keys.map(key => items.find(user => user?.id === key) || null);
    });
  }

  async load(key: string) {
    return this.loader.load(key);
  }
}
