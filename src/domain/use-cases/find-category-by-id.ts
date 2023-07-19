import { CategoryModel } from '../entities/category-model';

export namespace FindCategoryById {
  export type Params = {
    id: string;
  };

  export type Result = CategoryModel;
}
