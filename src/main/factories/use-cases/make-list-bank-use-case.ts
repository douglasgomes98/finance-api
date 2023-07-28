import { ListBankUseCase } from '@/data/use-cases/list-bank';
import { PrismaBankRepositoryAdapter } from '@/infra/database/postgresql/prisma-bank-repository-adapter';

export function makeListBankUseCase() {
  const prismaBankRepositoryAdapter = new PrismaBankRepositoryAdapter();
  const useCase = new ListBankUseCase(prismaBankRepositoryAdapter);

  return useCase;
}
