import { CategoryRepository } from "@/repositories/category-repository";
import { CategoryAlreadyExistsError } from "./errors/category-already-exists-error";

type CreateCategoryRequest = {
  name: string;
  color: string;
};

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ name, color }: CreateCategoryRequest) {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const category = await this.categoryRepository.create({
      name,
      color,
    });

    return category;
  }
}
