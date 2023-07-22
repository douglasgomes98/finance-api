import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id';
import { ListCreditCardUseCase } from '@/data/use-cases/list-credit-card';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeListCreditCardUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();

  const useCase = new ListCreditCardUseCase(
    findUserByIdUseCase,
    prismaCreditCardRepositoryAdapter,
  );

  return useCase;
}
