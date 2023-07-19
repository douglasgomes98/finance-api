import { CategoryModel } from '../entities/category-model';

export namespace ListCategory {
  export type Params = {
    userId: string;
  };

  export type Result = CategoryModel[];
}
