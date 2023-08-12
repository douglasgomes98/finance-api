import { FindExpenseByIdUseCase } from '@/data/use-cases/find-expense-by-id-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';

export function makeFindExpenseByIdUseCase() {
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const useCase = new FindExpenseByIdUseCase(prismaExpenseRepositoryAdapter);

  return useCase;
}
