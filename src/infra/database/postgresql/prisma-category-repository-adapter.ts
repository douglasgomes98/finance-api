import { FindCategoryByIdRepository } from '@/data/protocols/database/find-category-by-id-repository';
import { FindCategoryByNameRepository } from '@/data/protocols/database/find-category-by-name-repository';
import { FindCategoryByUserRepository } from '@/data/protocols/database/find-category-by-user-repository';
import { CreateCategoryRepository } from '@/data/protocols/database/create-category-repository';
import { UpdateCategoryRepository } from '@/data/protocols/database/update-category-repository';
import { DeleteCategoryRepository } from '@/data/protocols/database/delete-category-repository';

import { categoryMapper } from './mappers/category-mapper';
import { database } from './database';

export class PrismaCategoryRepositoryAdapter
  implements
    FindCategoryByIdRepository,
    FindCategoryByNameRepository,
    FindCategoryByUserRepository,
    CreateCategoryRepository,
    UpdateCategoryRepository,
    DeleteCategoryRepository
{
  async findById({
    id,
  }: FindCategoryByIdRepository.Params): Promise<FindCategoryByIdRepository.Result> {
    const row = await database.category.findUnique({
      where: { id },
    });

    if (!row) return null;

    return categoryMapper.toEntity(row);
  }

  async findByName({
    name,
  }: FindCategoryByNameRepository.Params): Promise<FindCategoryByIdRepository.Result> {
    const row = await database.category.findFirst({
      where: { name },
    });

    if (!row) return null;

    return categoryMapper.toEntity(row);
  }

  async findByUser({
    id,
  }: FindCategoryByUserRepository.Params): Promise<FindCategoryByUserRepository.Result> {
    const rows = await database.category.findMany({
      where: { userId: id },
      orderBy: { name: 'asc' },
    });

    return rows.map(categoryMapper.toEntity);
  }

  async create(
    data: CreateCategoryRepository.Params,
  ): Promise<CreateCategoryRepository.Result> {
    const row = await database.category.create({
      data,
    });

    return categoryMapper.toEntity(row);
  }

  async update({
    id,
    data,
  }: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Result> {
    const row = await database.category.update({
      where: { id },
      data,
    });

    return categoryMapper.toEntity(row);
  }

  async delete({
    id,
  }: DeleteCategoryRepository.Params): Promise<DeleteCategoryRepository.Result> {
    await database.category.delete({
      where: { id },
    });
  }
}
