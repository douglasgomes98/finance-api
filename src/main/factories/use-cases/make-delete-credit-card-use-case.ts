import { DeleteCreditCardUseCase } from '@/data/use-cases/delete-credit-card-use-case';
import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { ZodDeleteCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-delete-credit-card-validator-adapter';
import { ZodFindCreditCardByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-credit-card-by-id-validator-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';

export function makeDeleteCreditCardUseCase() {
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const zodFindCreditCardByIdValidatorAdapter =
    new ZodFindCreditCardByIdValidatorAdapter();
  const findCreditCardByIdUseCase = new FindCreditCardByIdUseCase(
    prismaCreditCardRepositoryAdapter,
    zodFindCreditCardByIdValidatorAdapter,
  );
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodDeleteCreditCardValidatorAdapter =
    new ZodDeleteCreditCardValidatorAdapter();
  const useCase = new DeleteCreditCardUseCase(
    findCreditCardByIdUseCase,
    prismaCreditCardRepositoryAdapter,
    findUserByIdUseCase,
    prismaExpenseRepositoryAdapter,
    zodDeleteCreditCardValidatorAdapter,
  );

  return useCase;
}
