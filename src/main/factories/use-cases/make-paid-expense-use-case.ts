import { PaidExpenseUseCase } from '@/data/use-cases/paid-expense-use-case';
import { UpdateCreditCardLimitUseCase } from '@/data/use-cases/update-credit-card-limit-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { ZodPaidExpenseValidatorAdapter } from '@/infra/validators/zod/zod-paid-expense-validator-adapter';
import { ZodUpdateCreditCardLimitValidatorAdapter } from '@/infra/validators/zod/zod-update-credit-card-limit-validator-adapter';

export function makePaidExpenseUseCase() {
  const zodPaidExpenseValidatorAdapter = new ZodPaidExpenseValidatorAdapter();
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
  const useCase = new PaidExpenseUseCase(
    zodPaidExpenseValidatorAdapter,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    updateCreditCardLimitUseCase,
  );

  return useCase;
}
