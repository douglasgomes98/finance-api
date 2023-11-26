import { UpdateCreditCardLimitUseCase } from '@/data/use-cases/update-credit-card-limit-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodUpdateCreditCardLimitValidatorAdapter } from '@/infra/validators/zod/zod-update-credit-card-limit-validator-adapter';

export function makeUpdateCreditCardLimitUseCase() {
  const zodUpdateCreditCardLimitValidatorAdapter =
    new ZodUpdateCreditCardLimitValidatorAdapter();
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const useCase = new UpdateCreditCardLimitUseCase(
    zodUpdateCreditCardLimitValidatorAdapter,
    prismaCreditCardRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    prismaCreditCardRepositoryAdapter,
  );

  return useCase;
}
