import { CategoryModel } from '@/domain/entities/category-model';

export namespace FindCategoryByIdRepository {
  export type Params = {
    id: string;
  };

  export type Result = CategoryModel | null;
}

export type FindCategoryByIdRepository = {
  findById: (
    data: FindCategoryByIdRepository.Params,
  ) => Promise<FindCategoryByIdRepository.Result>;
};
