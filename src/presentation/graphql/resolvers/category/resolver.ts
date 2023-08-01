import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { z } from 'zod';

import { makeListCategoryUseCase } from '@/main/factories/use-cases/make-list-category-use-case';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { makeCreateCategoryUseCase } from '@/main/factories/use-cases/make-create-category-use-case';
import { makeUpdateCategoryUseCase } from '@/main/factories/use-cases/make-update-category-use-case';
import { makeDeleteCategoryUseCase } from '@/main/factories/use-cases/make-delete-category-use-case';

import { Category, CreateCategoryInput, UpdateCategoryInput } from './type';
import { ApolloContext } from '../../types';

@Service()
@Resolver()
export class CategoryResolver {
  @Authorized()
  @Query(() => [Category])
  async listCategories(@Ctx() { userId }: ApolloContext) {
    const useCase = makeListCategoryUseCase();

    return useCase.execute({ userId });
  }

  @Authorized()
  @Mutation(() => Category)
  async createCategory(
    @Arg('data') data: CreateCategoryInput,
    @Ctx() { userId }: ApolloContext,
  ) {
    const formatterAdapter = new FormatterAdapter();
    // TODO: Move validation to a dependency
    const validator = z.object({
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(formatterAdapter.normalizeName),
      color: z
        .string()
        .length(7)
        .regex(/^#[0-9a-f]{6}$/i)
        .trim()
        .transform(value => value.toUpperCase()),
    });

    const safeValues = validator.parse(data);

    const useCase = makeCreateCategoryUseCase();

    return useCase.execute({ ...safeValues, userId });
  }

  @Authorized()
  @Mutation(() => Category)
  async updateCategory(
    @Arg('id') id: string,
    @Arg('data') data: UpdateCategoryInput,
    @Ctx() { userId }: ApolloContext,
  ) {
    const formatterAdapter = new FormatterAdapter();

    // TODO: Move validation to a dependency
    const validator = z.object({
      id: z.string().nonempty().uuid(),
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(formatterAdapter.normalizeName),
      color: z
        .string()
        .length(7)
        .regex(/^#[0-9a-f]{6}$/i)
        .trim()
        .transform(value => value.toUpperCase()),
    });

    const safeValues = validator.parse({ id, ...data });

    const useCase = makeUpdateCategoryUseCase();

    return useCase.execute({ ...safeValues, userId });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id') id: string,
    @Ctx() { userId }: ApolloContext,
  ) {
    // TODO: Move validation to a dependency
    const validator = z.object({
      id: z.string().nonempty().uuid(),
    });

    const safeValues = validator.parse({ id });

    const useCase = makeDeleteCategoryUseCase();

    await useCase.execute({ ...safeValues, userId });

    return true;
  }
}
