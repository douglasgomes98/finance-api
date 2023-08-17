import { DeleteExpenseUseCase } from '@/data/use-cases/delete-expense-use-case';
import { FindExpenseByIdUseCase } from '@/data/use-cases/find-expense-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { ZodDeleteExpenseValidatorAdapter } from '@/infra/validators/zod/zod-delete-expense-validator-adapter';
import { ZodFindExpenseByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-expense-by-id-validator-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';

export function makeDeleteExpenseUseCase() {
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodFindExpenseByIdValidatorAdapter =
    new ZodFindExpenseByIdValidatorAdapter();
  const findExpenseByIdUseCase = new FindExpenseByIdUseCase(
    prismaExpenseRepositoryAdapter,
    zodFindExpenseByIdValidatorAdapter,
  );
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
  const zodDeleteExpenseValidatorAdapter =
    new ZodDeleteExpenseValidatorAdapter();
  const useCase = new DeleteExpenseUseCase(
    findExpenseByIdUseCase,
    prismaExpenseRepositoryAdapter,
    findUserByIdUseCase,
    zodDeleteExpenseValidatorAdapter,
  );

  return useCase;
}
