import { UpdateExpenseUseCase } from '@/data/use-cases/update-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodUpdateExpenseValidator } from '@/infra/validators/zod/zod-update-expense-validator';

import { makeFindExpenseByIdUseCase } from './make-find-expense-by-id-use-case';

export function makeUpdateExpenseUseCase() {
  const findExpenseByIdUseCase = makeFindExpenseByIdUseCase();
  const zodUpdateExpenseValidator = new ZodUpdateExpenseValidator();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const useCase = new UpdateExpenseUseCase(
    zodUpdateExpenseValidator,
    findExpenseByIdUseCase,
    prismaExpenseRepositoryAdapter,
  );

  return useCase;
}
