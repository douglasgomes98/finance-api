import { CategoryRepository } from '@/repositories/category-repository';

import { UseCase } from '../use-case';
import { FindCategoryByIdUseCase } from './find-category-by-id';

type DeleteCategoryUseCaseRequest = {
  id: string;
};
// TODO: verificar se existe despesas com essa categoria. caso permitir migrar as despesas para outra categoria, ou deletar as despesas
export class DeleteCategoryUseCase
  implements UseCase<DeleteCategoryUseCaseRequest, void>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({ id }: DeleteCategoryUseCaseRequest): Promise<void> {
    const category = await this.findCategoryByIdUseCase.execute({ id });

    await this.categoryRepository.delete(category.id);
  }
}
