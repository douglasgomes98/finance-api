import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';

export function makeFindCreditCardByIdUseCase() {
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const useCase = new FindCreditCardByIdUseCase(
    prismaCreditCardRepositoryAdapter,
  );

  return useCase;
}
