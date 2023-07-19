import { CategoryModel } from '../entities/category-model';

export namespace CreateCategory {
  export type Params = Omit<CategoryModel, 'id'>;

  export type Result = CategoryModel;
}
