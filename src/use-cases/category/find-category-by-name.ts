import { CategoryRepository } from '@/repositories/category-repository';
import { CategoryModel } from '@/entities/category-model';

import { UseCase } from '../use-case';
import { CategoryNotFoundError } from './errors/category-not-found-error';

type FindCategoryByNameUseCaseRequest = {
  name: string;
};

type FindCategoryByNameUseCaseResponse = CategoryModel;

export class FindCategoryByNameUseCase
  implements
    UseCase<
      FindCategoryByNameUseCaseRequest,
      FindCategoryByNameUseCaseResponse
    >
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    name,
  }: FindCategoryByNameUseCaseRequest): Promise<FindCategoryByNameUseCaseResponse> {
    const category = await this.categoryRepository.findByName(name);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return category;
  }
}
