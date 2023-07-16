import { CategoryRepository } from '@/repositories/category-repository';

import { UseCase } from '../use-case';
import { CategoryNotFoundError } from './errors/category-not-found-error';
// TODO: verificar se existe despesas com essa categoria. caso permitir migrar as despesas para outra categoria, ou deletar as despesas
export class DeleteCategoryUseCase implements UseCase<string, void> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    await this.categoryRepository.delete(id);
  }
}
