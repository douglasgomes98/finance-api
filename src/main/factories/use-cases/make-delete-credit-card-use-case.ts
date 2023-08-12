import { DeleteCreditCardUseCase } from '@/data/use-cases/delete-credit-card-use-case';
import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
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
