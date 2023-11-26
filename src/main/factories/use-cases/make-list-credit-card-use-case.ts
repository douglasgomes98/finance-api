import { ListCreditCardUseCase } from '@/data/use-cases/list-credit-card-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { ZodListCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-list-credit-card-validator-adapter';

import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeListCreditCardUseCase() {
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const zodListCreditCardValidatorAdapter =
    new ZodListCreditCardValidatorAdapter();
  const useCase = new ListCreditCardUseCase(
    findUserByIdUseCase,
    prismaCreditCardRepositoryAdapter,
    zodListCreditCardValidatorAdapter,
  );

  return useCase;
}
