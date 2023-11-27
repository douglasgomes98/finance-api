import { CategoryAlreadyExistsError } from '@/domain/errors/category-already-exists-error';
import { UpdateCategory } from '@/domain/use-cases/update-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCategoryByNameRepository } from '../protocols/database/find-category-by-name-repository';
import { UpdateCategoryRepository } from '../protocols/database/update-category-repository';
import { FindCategoryByIdUseCase } from './find-category-by-id-use-case';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { UpdateCategoryValidator } from '../protocols/validators/update-category-validator';

export class UpdateCategoryUseCase
  implements UseCase<UpdateCategory.Params, UpdateCategory.Result>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly findCategoryByNameRepository: FindCategoryByNameRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateCategoryValidator: UpdateCategoryValidator,
  ) {}

  async execute(params: UpdateCategory.Params): Promise<UpdateCategory.Result> {
    const { categoryId, userId, name, color } =
      this.updateCategoryValidator.validate(params);

    const [, category] = await Promise.all([
      this.findUserByIdUseCase.execute({ id: userId }),
      this.findCategoryByIdUseCase.execute({ id: categoryId, userId }),
    ]);

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
