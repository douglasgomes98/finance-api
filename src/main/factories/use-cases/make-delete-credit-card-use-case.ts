import { DeleteCreditCardUseCase } from '@/data/use-cases/delete-credit-card';
import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';

export function makeDeleteCreditCardUseCase() {
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const findCreditCardByIdUseCase = new FindCreditCardByIdUseCase(
    prismaCreditCardRepositoryAdapter,
  );
  const useCase = new DeleteCreditCardUseCase(
    findCreditCardByIdUseCase,
    prismaCreditCardRepositoryAdapter,
  );

  return useCase;
}
