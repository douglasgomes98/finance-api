import { CategoriesRepository } from "@/repositories/categories-repository";
import { CategoryAlreadyExistsError } from "./errors/category-already-exists-error";

type CreateCategoryRequest = {
  name: string;
  color: string;
};

export class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({ name, color }: CreateCategoryRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const category = await this.categoriesRepository.create({
      name,
      color,
    });

    return category;
  }
}
