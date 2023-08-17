import { CategoryNotFoundError } from '@/domain/errors/category-not-found-error';
import { UseCase } from '@/domain/use-cases/use-case';
import { FindCategoryById } from '@/domain/use-cases/find-category-by-id';

import { FindCategoryByIdRepository } from '../protocols/database/find-category-by-id-repository';
import { FindCategoryByIdValidator } from '../protocols/validators/find-category-by-id-validator';

export class FindCategoryByIdUseCase
  implements UseCase<FindCategoryById.Params, FindCategoryById.Result>
{
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly findCategoryByIdValidator: FindCategoryByIdValidator,
  ) {}

  async execute(
    params: FindCategoryById.Params,
  ): Promise<FindCategoryById.Result> {
    const { id } = this.findCategoryByIdValidator.validate(params);

    const category = await this.findCategoryByIdRepository.findById({ id });

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return category;
  }
}
