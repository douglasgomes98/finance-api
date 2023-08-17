import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { ListCreditCardUseCase } from '@/data/use-cases/list-credit-card-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';
import { ZodListCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-list-credit-card-validator-adapter';

export function makeListCreditCardUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
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
