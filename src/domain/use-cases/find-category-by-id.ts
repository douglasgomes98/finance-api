import { CategoryModel } from '../entities/category-model';

export namespace FindCategoryById {
  export type Params = {
    id: string;
    userId?: string;
  };

  export type Result = CategoryModel;
}
