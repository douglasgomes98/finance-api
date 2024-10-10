import { CreateFixedWalletExpenseUseCase } from '@/data/use-cases/create-fixed-wallet-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';

export function makeCreateFixedWalletExpenseUseCase() {
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const dateFnsAdapter = new DateFnsAdapter();
  const useCase = new CreateFixedWalletExpenseUseCase(
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
  );

  return useCase;
}
