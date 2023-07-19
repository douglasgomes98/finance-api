import { CategoryNotFoundError } from '@/domain/errors/category-not-found-error';
import { UseCase } from '@/domain/use-cases/use-case';
import { FindCategoryById } from '@/domain/use-cases/find-category-by-id';

import { FindCategoryByIdRepository } from '../protocols/database/find-category-by-id';

export class FindCategoryByIdUseCase
  implements UseCase<FindCategoryById.Params, FindCategoryById.Result>
{
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
  ) {}

  async execute({
    id,
  }: FindCategoryById.Params): Promise<FindCategoryById.Result> {
    const category = await this.findCategoryByIdRepository.findById({ id });

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return category;
  }
}
