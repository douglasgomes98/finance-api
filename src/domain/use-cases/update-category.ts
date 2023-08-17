import { CategoryModel } from '../entities/category-model';

export namespace UpdateCategory {
  export type Params = {
    categoryId: string;
    userId: string;
    name: string;
    color: string;
  };

  export type Result = CategoryModel;
}
