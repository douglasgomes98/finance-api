import { CategoryModel } from '@/entities/category-model';
import { CategoryRepository } from '@/repositories/category-repository';

import { UseCase } from '../use-case';

type ListCategoryRequest = {
  userId: string;
};

type ListCategoryResponse = {
  data: CategoryModel[];
};

export class ListCategoryUseCase
  implements UseCase<ListCategoryRequest, ListCategoryResponse>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    userId,
  }: ListCategoryRequest): Promise<ListCategoryResponse> {
    const categories = await this.categoryRepository.findByUserId(userId);

    return { data: categories };
  }
}
