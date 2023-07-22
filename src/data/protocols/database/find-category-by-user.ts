import { CategoryModel } from '@/domain/entities/category-model';

export namespace FindCategoryByUserRepository {
  export type Params = {
    id: string;
  };

  export type Result = CategoryModel[];
}

export type FindCategoryByUserRepository = {
  findByUser: (
    data: FindCategoryByUserRepository.Params,
  ) => Promise<FindCategoryByUserRepository.Result>;
};
