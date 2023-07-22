import { CreateCreditCardUseCase } from '@/data/use-cases/create-credit-card';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeCreateCreditCardUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const useCase = new CreateCreditCardUseCase(
    findUserByIdUseCase,
    prismaCreditCardRepositoryAdapter,
    prismaCreditCardRepositoryAdapter,
  );

  return useCase;
}
