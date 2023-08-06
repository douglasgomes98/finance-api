import { CategoryModel } from '@/domain/entities/category-model';

export namespace FindCategoryByNameRepository {
  export type Params = {
    name: string;
  };

  export type Result = CategoryModel | null;
}

export type FindCategoryByNameRepository = {
  findByName: (
    data: FindCategoryByNameRepository.Params,
  ) => Promise<FindCategoryByNameRepository.Result>;
};
