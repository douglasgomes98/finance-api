import { CreateCategory } from '@/domain/use-cases/create-category';
import { UseCase } from '@/domain/use-cases/use-case';
import { CategoryAlreadyExistsError } from '@/domain/errors/category-already-exists-error';

import { FindCategoryByNameRepository } from '../protocols/database/find-category-by-name';
import { CreateCategoryRepository } from '../protocols/database/create-category';
import { FindUserByIdUseCase } from './find-user-by-id';

export class CreateCategoryUseCase
  implements UseCase<CreateCategory.Params, CreateCategory.Result>
{
  constructor(
    private readonly findCategoryByNameRepository: FindCategoryByNameRepository,
    private readonly createCategoryRepository: CreateCategoryRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute({
    name,
    color,
    userId,
  }: CreateCategory.Params): Promise<CreateCategory.Result> {
    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const categoryAlreadyExists =
      await this.findCategoryByNameRepository.findByName({ name });

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const category = await this.createCategoryRepository.create({
      name,
      color,
      userId: user.id,
    });

    return category;
  }
}
