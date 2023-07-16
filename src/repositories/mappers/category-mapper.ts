import { Category } from "@prisma/client";
import { CategoryRepositoryDTO } from "../category-repository";
import { Mapper } from "./mapper";

class CategoryMapper implements Mapper<CategoryRepositoryDTO, Category> {
  toRepository(data: CategoryRepositoryDTO): Partial<Category> {
    return {
      id: data.id,
      name: data.name,
      color: data.color,
    };
  }

  toEntity(data: Category): CategoryRepositoryDTO {
    return {
      id: data.id,
      name: data.name,
      color: data.color,
    };
  }
}

export const categoryMapper = new CategoryMapper();
