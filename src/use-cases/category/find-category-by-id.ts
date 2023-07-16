import { CategoryRepository } from '@/repositories/category-repository';
import { CategoryModel } from '@/entities/category-model';

import { UseCase } from '../use-case';
import { CategoryNotFoundError } from './errors/category-not-found-error';

type FindCategoryByIdUseCaseRequest = {
  id: string;
};

type FindCategoryByIdUseCaseResponse = CategoryModel;

export class FindCategoryByIdUseCase
  implements
    UseCase<FindCategoryByIdUseCaseRequest, FindCategoryByIdUseCaseResponse>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    id,
  }: FindCategoryByIdUseCaseRequest): Promise<FindCategoryByIdUseCaseResponse> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return category;
  }
}
