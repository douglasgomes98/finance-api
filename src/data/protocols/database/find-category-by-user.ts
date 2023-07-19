import { CategoryModel } from '@/domain/entities/category-model';

export namespace FindCategoryUserRepository {
  export type Params = {
    id: string;
  };

  export type Result = CategoryModel[];
}

export type FindCategoryUserRepository = {
  findByUser: (
    data: FindCategoryUserRepository.Params,
  ) => Promise<FindCategoryUserRepository.Result>;
};
