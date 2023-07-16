import { database } from './database';
import {
  CategoryCreateRepositoryDTO,
  CategoryRepository,
  CategoryRepositoryDTO,
  CategoryUpdateRepositoryDTO,
} from '../category-repository';
import { categoryMapper } from '../mappers/category-mapper';

export class PrismaCategoryRepository implements CategoryRepository {
  async findById(id: string): Promise<CategoryRepositoryDTO | null> {
    const row = await database.category.findUnique({
      where: { id },
    });

    if (!row) return null;

    return categoryMapper.toEntity(row);
  }

  async findByName(name: string): Promise<CategoryRepositoryDTO | null> {
    const row = await database.category.findFirst({
      where: { name },
    });

    if (!row) return null;

    return categoryMapper.toEntity(row);
  }

  async findMany(): Promise<CategoryRepositoryDTO[]> {
    const rows = await database.category.findMany();

    return rows.map(categoryMapper.toEntity);
  }

  async create(
    data: CategoryCreateRepositoryDTO,
  ): Promise<CategoryRepositoryDTO> {
    const row = await database.category.create({
      data,
    });

    return categoryMapper.toEntity(row);
  }

  async update(
    id: string,
    data: CategoryUpdateRepositoryDTO,
  ): Promise<CategoryRepositoryDTO> {
    const category = await database.category.update({
      where: { id },
      data,
    });

    return categoryMapper.toEntity(category);
  }

  async delete(id: string): Promise<void> {
    await database.category.delete({
      where: { id },
    });
  }
}
