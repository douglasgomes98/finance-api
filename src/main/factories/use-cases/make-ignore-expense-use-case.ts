import { IgnoreExpenseUseCase } from '@/data/use-cases/ignore-expense-use-case';
import { UpdateCreditCardLimitUseCase } from '@/data/use-cases/update-credit-card-limit-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodIgnoreExpenseValidatorAdapter } from '@/infra/validators/zod/zod-ignore-expense-validator-adapter';
import { ZodUpdateCreditCardLimitValidatorAdapter } from '@/infra/validators/zod/zod-update-credit-card-limit-validator-adapter';

export function makeIgnoreExpenseUseCase() {
  const zodIgnoreExpenseValidatorAdapter =
    new ZodIgnoreExpenseValidatorAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodUpdateCreditCardLimitValidatorAdapter =
    new ZodUpdateCreditCardLimitValidatorAdapter();
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const updateCreditCardLimitUseCase = new UpdateCreditCardLimitUseCase(
    zodUpdateCreditCardLimitValidatorAdapter,
    prismaCreditCardRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    prismaCreditCardRepositoryAdapter,
  );
  const useCase = new IgnoreExpenseUseCase(
    zodIgnoreExpenseValidatorAdapter,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    updateCreditCardLimitUseCase,
  );

  return useCase;
}
