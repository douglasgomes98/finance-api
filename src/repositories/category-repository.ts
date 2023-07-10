import { Category, Prisma } from "@prisma/client";

export type CategoryCreateInput = Pick<
  Prisma.CategoryCreateInput,
  "name" | "color"
>;

export type CategoryUpdateInput = CategoryCreateInput;

export type CategoryRepository = {
  findById: (id: string) => Promise<Category | null>;
  findByName: (name: string) => Promise<Category | null>;
  findMany: () => Promise<Category[]>;
  create: (data: CategoryCreateInput) => Promise<Category>;
  update: (id: string, data: CategoryUpdateInput) => Promise<Category>;
  delete: (id: string) => Promise<void>;
};
