import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { z } from 'zod';

import { normalizeName } from '@/helpers/normalize-name';
import { makeCreateCategoryUseCase } from '@/use-cases/category/factories/make-create-category-use-case';
import { makeListCategoryUseCase } from '@/use-cases/category/factories/make-list-category-use-case';
import { makeUpdateCategoryUseCase } from '@/use-cases/category/factories/make-update-category-use-case';
import { makeDeleteCategoryUseCase } from '@/use-cases/category/factories/make-delete-category-use-case';

import { Category, CreateCategoryInput } from './type';

@Service()
@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async listCategories() {
    const useCase = makeListCategoryUseCase();

    const { data } = await useCase.execute({ userId: 'fake-user-id' });

    return data;
  }

  @Mutation(() => Category)
  async createCategory(@Arg('data') data: CreateCategoryInput) {
    // TODO: Move validation to a dependency
    const validator = z.object({
      name: z
        .string()
        .nonempty()
        .transform(value => normalizeName(value)),
      color: z
        .string()
        .length(7)
        .regex(/^#[0-9a-f]{6}$/i)
        .transform(value => value.toUpperCase()),
    });

    const safeValues = validator.parse(data);

    const useCase = makeCreateCategoryUseCase();

    return useCase.execute(safeValues);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg('id') id: string,
    @Arg('data') data: CreateCategoryInput,
  ) {
    // TODO: Move validation to a dependency
    const validator = z.object({
      id: z.string().nonempty(),
      name: z
        .string()
        .nonempty()
        .transform(value => normalizeName(value)),
      color: z
        .string()
        .length(7)
        .regex(/^#[0-9a-f]{6}$/i)
        .transform(value => value.toUpperCase()),
    });

    const safeValues = validator.parse({ id, ...data });

    const useCase = makeUpdateCategoryUseCase();

    return useCase.execute(safeValues);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id') id: string) {
    // TODO: Move validation to a dependency
    const validator = z.object({
      id: z.string().nonempty(),
    });

    const safeValues = validator.parse({ id });

    const useCase = makeDeleteCategoryUseCase();

    await useCase.execute(safeValues);

    return true;
  }
}
