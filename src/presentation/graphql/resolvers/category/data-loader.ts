import Dataloader from 'dataloader';
import { Service } from 'typedi';

import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id-use-case';
import { CategoryModel } from '@/domain/entities/category-model';
import { makeFindCategoryByIdUseCase } from '@/main/factories/use-cases/make-find-category-by-id-use-case';

@Service()
export class CategoryDataLoader {
  private readonly loader;

  private readonly useCase: FindCategoryByIdUseCase;

  constructor() {
    this.useCase = makeFindCategoryByIdUseCase();
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
    return new Dataloader<string, CategoryModel | null, string>(async keys => {
      const items = await Promise.all(keys.map(key => this.getItem(key)));

      return keys.map(key => items.find(user => user?.id === key) || null);
    });
  }

  async load(key: string) {
    return this.loader.load(key);
  }
}
