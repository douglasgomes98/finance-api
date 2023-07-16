import { CategoryModel } from "@/entities/category-model";

export type CategoryRepositoryDTO = Pick<
  CategoryModel,
  "id" | "name" | "color"
>;

export type CategoryCreateRepositoryDTO = Omit<CategoryRepositoryDTO, "id">;

export type CategoryUpdateRepositoryDTO = Partial<
  Omit<CategoryRepositoryDTO, "id">
>;

export type CategoryRepository = {
  findById: (id: string) => Promise<CategoryRepositoryDTO | null>;
  findByName: (name: string) => Promise<CategoryRepositoryDTO | null>;
  findMany: () => Promise<CategoryRepositoryDTO[]>;
  create: (data: CategoryCreateRepositoryDTO) => Promise<CategoryRepositoryDTO>;
  update: (
    id: string,
    data: CategoryUpdateRepositoryDTO
  ) => Promise<CategoryRepositoryDTO>;
  delete: (id: string) => Promise<void>;
};
