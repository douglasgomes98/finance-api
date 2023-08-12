import { CreateCreditCardUseCase } from '@/data/use-cases/create-credit-card-use-case';
import { FindBankByIdUseCase } from '@/data/use-cases/find-bank-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaBankRepositoryAdapter } from '@/infra/database/postgresql/prisma-bank-repository-adapter';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';

export function makeCreateCreditCardUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const prismaBankRepositoryAdapter = new PrismaBankRepositoryAdapter();
  const findBankByIdUseCase = new FindBankByIdUseCase(
    prismaBankRepositoryAdapter,
  );
  const useCase = new CreateCreditCardUseCase(
    findUserByIdUseCase,
    prismaCreditCardRepositoryAdapter,
    prismaCreditCardRepositoryAdapter,
    findBankByIdUseCase,
  );

  return useCase;
}
