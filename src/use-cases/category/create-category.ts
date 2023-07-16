import { CategoryModel } from '@/entities/category-model';
import { CategoryRepository } from '@/repositories/category-repository';

import { UseCase } from '../use-case';
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error';
import { FindCategoryByNameUseCase } from './find-category-by-name';

type CreateCategoryUseCaseRequest = Pick<CategoryModel, 'name' | 'color'>;

type CreateCategoryUseCaseResponse = Pick<
  CategoryModel,
  'id' | 'name' | 'color'
>;

export class CreateCategoryUseCase
  implements
    UseCase<CreateCategoryUseCaseRequest, CreateCategoryUseCaseResponse>
{
  constructor(
    private readonly findCategoryByNameUseCase: FindCategoryByNameUseCase,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({
    name,
    color,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const categoryAlreadyExists = await this.findCategoryByNameUseCase.execute({
      name,
    });

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
