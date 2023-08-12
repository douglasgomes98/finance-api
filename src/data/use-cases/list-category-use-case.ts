import { ListCategory } from '@/domain/use-cases/list-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCategoryByUserRepository } from '../protocols/database/find-category-by-user-repository';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';

export class ListCategoryUseCase
  implements UseCase<ListCategory.Params, ListCategory.Result>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findCategoryByUserRepository: FindCategoryByUserRepository,
  ) {}

  async execute({ userId }: ListCategory.Params): Promise<ListCategory.Result> {
    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const categories = await this.findCategoryByUserRepository.findByUser({
      id: user.id,
    });

    return categories;
  }
}
