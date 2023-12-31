import { DeleteCategory } from '@/domain/use-cases/delete-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCategoryByIdUseCase } from './find-category-by-id-use-case';
import { DeleteCategoryRepository } from '../protocols/database/delete-category-repository';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { DeleteCategoryValidator } from '../protocols/validators/delete-category-validator';

// TODO: verificar se existe despesas com essa categoria. caso permitir migrar as despesas para outra categoria, ou deletar as despesas
export class DeleteCategoryUseCase
  implements UseCase<DeleteCategory.Params, DeleteCategory.Result>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly deleteCategoryRepository: DeleteCategoryRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly deleteCategoryValidator: DeleteCategoryValidator,
  ) {}

  async execute(params: DeleteCategory.Params): Promise<DeleteCategory.Result> {
    const { categoryId, userId } =
      this.deleteCategoryValidator.validate(params);

    const [, category] = await Promise.all([
      this.findUserByIdUseCase.execute({ id: userId }),
      this.findCategoryByIdUseCase.execute({ id: categoryId, userId }),
    ]);

    await this.deleteCategoryRepository.delete({ id: category.id });
  }
}
