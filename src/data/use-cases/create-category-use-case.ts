import { CategoryAlreadyExistsError } from '@/domain/errors/category-already-exists-error';
import { CreateCategory } from '@/domain/use-cases/create-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { CreateCategoryRepository } from '../protocols/database/create-category-repository';
import { FindCategoryByNameRepository } from '../protocols/database/find-category-by-name-repository';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { CreateCategoryValidator } from '../protocols/validators/create-category-validator';

export class CreateCategoryUseCase
  implements UseCase<CreateCategory.Params, CreateCategory.Result>
{
  constructor(
    private readonly findCategoryByNameRepository: FindCategoryByNameRepository,
    private readonly createCategoryRepository: CreateCategoryRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly createCategoryValidator: CreateCategoryValidator,
  ) {}

  async execute(params: CreateCategory.Params): Promise<CreateCategory.Result> {
    const { userId, name, color } =
      this.createCategoryValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const categoryAlreadyExists =
      await this.findCategoryByNameRepository.findByName({ name });

    if (categoryAlreadyExists && categoryAlreadyExists.userId === user.id) {
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
