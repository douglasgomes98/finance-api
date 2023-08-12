import Dataloader from 'dataloader';
import { Service } from 'typedi';

import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { UserWithoutPassword } from '@/domain/entities/user-model';
import { makeFindUserByIdUseCase } from '@/main/factories/use-cases/make-find-user-by-id-use-case';

@Service()
export class UserDataLoader {
  private readonly loader;

  private readonly useCase: FindUserByIdUseCase;

  constructor() {
    this.useCase = makeFindUserByIdUseCase();
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
    return new Dataloader<string, UserWithoutPassword | null, string>(
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
