import { CategoryModel } from '@/entities/category-model';
import { CategoryRepository } from '@/repositories/category-repository';

import { UseCase } from '../use-case';
import { FindUserByIdUseCase } from '../user/find-user-by-id';

type ListCategoryUseCaseRequest = {
  userId: string;
};

type ListCategoryUseCaseResponse = {
  data: CategoryModel[];
};

export class ListCategoryUseCase
  implements UseCase<ListCategoryUseCaseRequest, ListCategoryUseCaseResponse>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({
    userId,
  }: ListCategoryUseCaseRequest): Promise<ListCategoryUseCaseResponse> {
    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const categories = await this.categoryRepository.findByUserId(user.id);

    return { data: categories };
  }
}
