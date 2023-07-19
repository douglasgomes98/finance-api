import { CategoryModel } from '@/domain/entities/category-model';
import { Category } from '@prisma/client';

import { Mapper } from '../../mapper';

class CategoryMapper implements Mapper<CategoryModel, Category> {
  toRepository(data: CategoryModel): Partial<Category> {
    return {
      id: data.id,
      name: data.name,
      color: data.color,
    };
  }

  toEntity(data: Category): CategoryModel {
    return {
      id: data.id,
      name: data.name,
      color: data.color,
      userId: data.userId || '',
    };
  }
}

export const categoryMapper = new CategoryMapper();
