import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { z } from 'zod';

import { makeListCategoryUseCase } from '@/main/factories/use-cases/make-list-category-use-case';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { makeCreateCategoryUseCase } from '@/main/factories/use-cases/make-create-category-use-case';
import { makeUpdateCategoryUseCase } from '@/main/factories/use-cases/make-update-category-use-case';
import { makeDeleteCategoryUseCase } from '@/main/factories/use-cases/make-delete-category-use-case';

import { Category, CreateCategoryInput } from './type';

@Service()
@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async listCategories() {
    const useCase = makeListCategoryUseCase();

    return useCase.execute({ userId: 'fake-user-id' });
  }

  @Mutation(() => Category)
  async createCategory(@Arg('data') data: CreateCategoryInput) {
    const formatterAdapter = new FormatterAdapter();
    // TODO: Move validation to a dependency
    const validator = z.object({
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(value => formatterAdapter.normalizeName(value)),
      color: z
        .string()
        .length(7)
        .regex(/^#[0-9a-f]{6}$/i)
        .trim()
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
    const formatterAdapter = new FormatterAdapter();

    // TODO: Move validation to a dependency
    const validator = z.object({
      id: z.string().nonempty(),
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(value => formatterAdapter.normalizeName(value)),
      color: z
        .string()
        .length(7)
        .regex(/^#[0-9a-f]{6}$/i)
        .trim()
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
