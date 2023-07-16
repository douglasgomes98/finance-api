import { CategoryModel } from '@/entities/category-model';
import { CategoryRepository } from '@/repositories/category-repository';

import { UseCase } from '../use-case';
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error';

type UpdateCategoryRequest = Pick<CategoryModel, 'id' | 'name' | 'color'>;

type UpdateCategoryResponse = Pick<CategoryModel, 'id' | 'name' | 'color'>;

export class UpdateCategoryUseCase
  implements UseCase<UpdateCategoryRequest, UpdateCategoryResponse>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    id,
    name,
    color,
  }: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new CategoryAlreadyExistsError();
    }

    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
    );

    if (categoryAlreadyExists && categoryAlreadyExists.id !== id) {
      throw new CategoryAlreadyExistsError();
    }

    const updatedCategory = await this.categoryRepository.update(id, {
      name,
      color,
    });

    return updatedCategory;
  }
}
