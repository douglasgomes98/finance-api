import { DeleteExpenseUseCase } from '@/data/use-cases/delete-expense-use-case';
import { FindExpenseByIdUseCase } from '@/data/use-cases/find-expense-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeDeleteExpenseUseCase() {
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const findExpenseByIdUseCase = new FindExpenseByIdUseCase(
    prismaExpenseRepositoryAdapter,
  );
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const useCase = new DeleteExpenseUseCase(
    findExpenseByIdUseCase,
    prismaExpenseRepositoryAdapter,
    findUserByIdUseCase,
  );

  return useCase;
}
