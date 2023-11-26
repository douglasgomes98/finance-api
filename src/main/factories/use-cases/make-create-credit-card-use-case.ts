import { CreateCreditCardUseCase } from '@/data/use-cases/create-credit-card-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { ZodCreateCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-create-credit-card-validator-adapter';

import { makeFindBankByIdUseCase } from './make-find-bank-by-id-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeCreateCreditCardUseCase() {
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const findBankByIdUseCase = makeFindBankByIdUseCase();
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const formatterAdapter = new FormatterAdapter();
  const zodCreateCreditCardValidatorAdapter =
    new ZodCreateCreditCardValidatorAdapter(formatterAdapter);
  const useCase = new CreateCreditCardUseCase(
    findUserByIdUseCase,
    prismaCreditCardRepositoryAdapter,
    prismaCreditCardRepositoryAdapter,
    findBankByIdUseCase,
    zodCreateCreditCardValidatorAdapter,
  );

  return useCase;
}
