import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { makeListCategoryUseCase } from '@/main/factories/use-cases/make-list-category-use-case';
import { makeCreateCategoryUseCase } from '@/main/factories/use-cases/make-create-category-use-case';
import { makeUpdateCategoryUseCase } from '@/main/factories/use-cases/make-update-category-use-case';
import { makeDeleteCategoryUseCase } from '@/main/factories/use-cases/make-delete-category-use-case';

import { Category, CreateCategoryInput, UpdateCategoryInput } from './type';
import { ApolloContext } from '../../types';
import { CategoryDataLoader } from './data-loader';

@Service()
@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryDataLoader: CategoryDataLoader) {}

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
    const useCase = makeCreateCategoryUseCase();

    return useCase.execute({ ...data, userId });
  }

  @Authorized()
  @Mutation(() => Category)
  async updateCategory(
    @Arg('id') categoryId: string,
    @Arg('data') data: UpdateCategoryInput,
    @Ctx() { userId }: ApolloContext,
  ) {
    const useCase = makeUpdateCategoryUseCase();

    return useCase.execute({ categoryId, userId, ...data });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id') id: string,
    @Ctx() { userId }: ApolloContext,
  ) {
    const useCase = makeDeleteCategoryUseCase();

    await useCase.execute({ categoryId: id, userId });

    return true;
  }

  @Authorized()
  @Query(() => Category)
  async findCategoryById(@Arg('id') id: string) {
    return this.categoryDataLoader.load(id);
  }
}
