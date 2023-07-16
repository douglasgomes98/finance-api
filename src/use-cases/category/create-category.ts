import { CategoryRepository } from '@/repositories/category-repository';
import { CategoryModel } from '@/entities/category-model';

import { CategoryAlreadyExistsError } from './errors/category-already-exists-error';
import { UseCase } from '../use-case';

type CreateCategoryRequest = Pick<CategoryModel, 'name' | 'color'>;

type CreateCategoryResponse = Pick<CategoryModel, 'id' | 'name' | 'color'>;

export class CreateCategoryUseCase
  implements UseCase<CreateCategoryRequest, CreateCategoryResponse>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    name,
    color,
  }: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const category = await this.categoryRepository.create({
      name,
      color,
    });

    return category;
  }
}
