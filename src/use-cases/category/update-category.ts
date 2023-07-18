import { CategoryModel } from '@/entities/category-model';
import { CategoryRepository } from '@/repositories/category-repository';

import { UseCase } from '../use-case';
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error';
import { FindCategoryByIdUseCase } from './find-category-by-id';

type UpdateCategoryUseCaseRequest = Pick<
  CategoryModel,
  'id' | 'name' | 'color'
>;

type UpdateCategoryUseCaseResponse = Pick<
  CategoryModel,
  'id' | 'name' | 'color'
>;

export class UpdateCategoryUseCase
  implements
    UseCase<UpdateCategoryUseCaseRequest, UpdateCategoryUseCaseResponse>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({
    id,
    name,
    color,
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const category = await this.findCategoryByIdUseCase.execute({ id });

    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
    );

    if (categoryAlreadyExists && categoryAlreadyExists.id !== category.id) {
      throw new CategoryAlreadyExistsError();
    }

    if (category.name === name && category.color === color) {
      throw new CategoryAlreadyExistsError();
    }

    const updatedCategory = await this.categoryRepository.update(category.id, {
      name,
      color,
    });

    return updatedCategory;
  }
}
