import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { ZodFindCreditCardByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-credit-card-by-id-validator-adapter';

export function makeFindCreditCardByIdUseCase() {
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const zodFindCreditCardByIdValidatorAdapter =
    new ZodFindCreditCardByIdValidatorAdapter();
  const useCase = new FindCreditCardByIdUseCase(
    prismaCreditCardRepositoryAdapter,
    zodFindCreditCardByIdValidatorAdapter,
  );

  return useCase;
}
