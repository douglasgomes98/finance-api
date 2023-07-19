import { CategoryModel } from '@/domain/entities/category-model';

export namespace CreateCategoryRepository {
  export type Params = Omit<CategoryModel, 'id'>;

  export type Result = CategoryModel;
}

export type CreateCategoryRepository = {
  create: (
    data: CreateCategoryRepository.Params,
  ) => Promise<CreateCategoryRepository.Result>;
};
