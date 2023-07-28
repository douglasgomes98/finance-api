import { FindBankByIdUseCase } from '@/data/use-cases/find-bank-by-id';
import { PrismaBankRepositoryAdapter } from '@/infra/database/postgresql/prisma-bank-repository-adapter';

export function makeFindBankByIdUseCase() {
  const prismaBankRepositoryAdapter = new PrismaBankRepositoryAdapter();
  const useCase = new FindBankByIdUseCase(prismaBankRepositoryAdapter);

  return useCase;
}
