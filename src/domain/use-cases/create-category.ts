import { CategoryModel } from '../entities/category-model';

export namespace CreateCategory {
  export type Params = Pick<CategoryModel, 'name' | 'color'>;

  export type Result = Pick<CategoryModel, 'id' | 'name' | 'color'>;
}
