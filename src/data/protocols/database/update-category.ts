import { CategoryModel } from '@/domain/entities/category-model';

export namespace UpdateCategoryRepository {
  export type Params = {
    id: string;
    data: Omit<CategoryModel, 'id'>;
  };

  export type Result = CategoryModel;
}

export type UpdateCategoryRepository = {
  update: (
    data: UpdateCategoryRepository.Params,
  ) => Promise<UpdateCategoryRepository.Result>;
};
