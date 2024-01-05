import { ListExpenseByWalletUseCase } from '@/data/use-cases/list-expense-by-wallet-use-case';
import { ZodListExpenseByWalletValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-by-wallet-validator-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';

import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';

export function makeListExpenseByWalletUseCase() {
  const zodListExpenseByWalletValidatorAdapter =
    new ZodListExpenseByWalletValidatorAdapter();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const dateFnsAdapter = new DateFnsAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const useCase = new ListExpenseByWalletUseCase(
    zodListExpenseByWalletValidatorAdapter,
    findUserByIdUseCase,
    dateFnsAdapter,
    dateFnsAdapter,
    prismaExpenseRepositoryAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
  );

  return useCase;
}
