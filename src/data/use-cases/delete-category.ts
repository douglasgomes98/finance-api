import { DeleteCategory } from '@/domain/use-cases/delete-category';
import { UseCase } from '@/domain/use-cases/use-case';
import { YouAreNotAllowedToChangeThisResourceError } from '@/domain/errors/you-no-have-permission-error';

import { FindCategoryByIdUseCase } from './find-category-by-id';
import { DeleteCategoryRepository } from '../protocols/database/delete-category-repository';
import { FindUserByIdUseCase } from './find-user-by-id';

// TODO: verificar se existe despesas com essa categoria. caso permitir migrar as despesas para outra categoria, ou deletar as despesas
export class DeleteCategoryUseCase
  implements UseCase<DeleteCategory.Params, DeleteCategory.Result>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly deleteCategoryRepository: DeleteCategoryRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute({ id, userId }: DeleteCategory.Params): Promise<void> {
    const [user, category] = await Promise.all([
      this.findUserByIdUseCase.execute({ id: userId }),
      this.findCategoryByIdUseCase.execute({ id }),
    ]);

    if (category.userId !== user.id) {
      throw new YouAreNotAllowedToChangeThisResourceError();
    }

    await this.deleteCategoryRepository.delete({ id: category.id });
  }
}
