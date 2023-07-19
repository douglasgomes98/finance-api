import { ListCategory } from '@/domain/use-cases/list-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCategoryUserRepository } from '../protocols/database/find-category-by-user';
import { FindUserByIdUseCase } from './find-user-by-id';

export class ListCategoryUseCase
  implements UseCase<ListCategory.Params, ListCategory.Result>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findCategoryUserRepository: FindCategoryUserRepository,
  ) {}

  async execute({ userId }: ListCategory.Params): Promise<ListCategory.Result> {
    // TODO: Check if user exists
    // const user = await this.findUserByIdUseCase.execute({ id: userId });

    const categories = await this.findCategoryUserRepository.findByUser({
      id: userId,
    });

    return categories;
  }
}
