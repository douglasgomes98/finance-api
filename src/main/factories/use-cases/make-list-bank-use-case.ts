import { ListBankUseCase } from '@/data/use-cases/list-bank-use-case';
import { PrismaBankRepositoryAdapter } from '@/infra/database/postgresql/prisma-bank-repository-adapter';

export function makeListBankUseCase() {
  const prismaBankRepositoryAdapter = new PrismaBankRepositoryAdapter();
  const useCase = new ListBankUseCase(prismaBankRepositoryAdapter);

  return useCase;
}
