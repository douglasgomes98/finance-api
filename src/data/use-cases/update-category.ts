import { CategoryAlreadyExistsError } from '@/domain/errors/category-already-exists-error';
import { UpdateCategory } from '@/domain/use-cases/update-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCategoryByNameRepository } from '../protocols/database/find-category-by-name';
import { UpdateCategoryRepository } from '../protocols/database/update-category';
import { FindCategoryByIdUseCase } from './find-category-by-id';

export class UpdateCategoryUseCase
  implements UseCase<UpdateCategory.Params, UpdateCategory.Result>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly findCategoryByNameRepository: FindCategoryByNameRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository,
  ) {}

  async execute({
    id,
    name,
    color,
  }: UpdateCategory.Params): Promise<UpdateCategory.Result> {
    const category = await this.findCategoryByIdUseCase.execute({ id });

    const categoryAlreadyExists =
      await this.findCategoryByNameRepository.findByName({ name });

    if (categoryAlreadyExists && categoryAlreadyExists.id !== category.id) {
      throw new CategoryAlreadyExistsError();
    }

    if (category.name === name && category.color === color) {
      throw new CategoryAlreadyExistsError();
    }

    const updatedCategory = await this.updateCategoryRepository.update({
      id: category.id,
      data: {
        name,
        color,
      },
    });

    return updatedCategory;
  }
}
