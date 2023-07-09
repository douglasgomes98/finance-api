import { Category } from "@prisma/client";
import { database } from "./database";
import {
  CategoriesRepository,
  CategoryCreateInput,
} from "../categories-repository";

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findById(id: string): Promise<Category | null> {
    const category = await database.category.findUnique({
      where: { id },
    });

    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await database.category.findFirst({
      where: { name },
    });

    return category;
  }

  async findMany(): Promise<Category[]> {
    const categories = await database.category.findMany();

    return categories;
  }

  async create(data: CategoryCreateInput): Promise<Category> {
    const category = await database.category.create({
      data,
    });

    return category;
  }

  async update(id: string, data: CategoryCreateInput): Promise<Category> {
    const category = await database.category.update({
      where: { id },
      data,
    });

    return category;
  }

  async delete(id: string): Promise<void> {
    await database.category.delete({
      where: { id },
    });
  }
}
