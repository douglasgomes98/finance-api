import { FindExpenseByIdUseCase } from '@/data/use-cases/find-expense-by-id-use-case';
import { UpdateExpenseUseCase } from '@/data/use-cases/update-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodFindExpenseByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-expense-by-id-validator-adapter';
import { ZodUpdateExpenseValidator } from '@/infra/validators/zod/zod-update-expense-validator';

export function makeUpdateExpenseUseCase() {
  const zodUpdateExpenseValidator = new ZodUpdateExpenseValidator();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodFindExpenseByIdValidatorAdapter =
    new ZodFindExpenseByIdValidatorAdapter();
  const findExpenseByIdUseCase = new FindExpenseByIdUseCase(
    prismaExpenseRepositoryAdapter,
    zodFindExpenseByIdValidatorAdapter,
  );
  const useCase = new UpdateExpenseUseCase(
    zodUpdateExpenseValidator,
    findExpenseByIdUseCase,
    prismaExpenseRepositoryAdapter,
  );

  return useCase;
}
