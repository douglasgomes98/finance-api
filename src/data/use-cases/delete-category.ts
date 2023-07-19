import { DeleteCategory } from '@/domain/use-cases/delete-category';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCategoryByIdUseCase } from './find-category-by-id';
import { DeleteCategoryRepository } from '../protocols/database/delete-category';

// TODO: verificar se existe despesas com essa categoria. caso permitir migrar as despesas para outra categoria, ou deletar as despesas
export class DeleteCategoryUseCase
  implements UseCase<DeleteCategory.Params, DeleteCategory.Result>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly deleteCategoryRepository: DeleteCategoryRepository,
  ) {}

  async execute({ id }: DeleteCategory.Params): Promise<void> {
    const category = await this.findCategoryByIdUseCase.execute({ id });

    await this.deleteCategoryRepository.delete({ id: category.id });
  }
}
