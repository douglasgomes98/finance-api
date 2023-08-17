import { FindBankByIdUseCase } from '@/data/use-cases/find-bank-by-id-use-case';
import { PrismaBankRepositoryAdapter } from '@/infra/database/postgresql/prisma-bank-repository-adapter';
import { ZodFindBankByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-bank-by-id-validator-adapter';

export function makeFindBankByIdUseCase() {
  const prismaBankRepositoryAdapter = new PrismaBankRepositoryAdapter();
  const zodFindBankByIdValidatorAdapter = new ZodFindBankByIdValidatorAdapter();
  const useCase = new FindBankByIdUseCase(
    prismaBankRepositoryAdapter,
    zodFindBankByIdValidatorAdapter,
  );

  return useCase;
}
