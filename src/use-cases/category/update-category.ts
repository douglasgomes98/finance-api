import { CategoryModel } from '@/entities/category-model';
import { CategoryRepository } from '@/repositories/category-repository';

import { UseCase } from '../use-case';
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error';
import { FindCategoryByIdUseCase } from './find-category-by-id';
import { FindCategoryByNameUseCase } from './find-category-by-name';

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
    private readonly findCategoryByNameUseCase: FindCategoryByNameUseCase,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({
    id,
    name,
    color,
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const category = await this.findCategoryByIdUseCase.execute({ id });

    const categoryAlreadyExists = await this.findCategoryByNameUseCase.execute({
      name,
    });

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const updatedCategory = await this.categoryRepository.update(category.id, {
      name,
      color,
    });

    return updatedCategory;
  }
}
