import { CreateFixedExpenseUseCase } from '@/data/use-cases/create-fixed-expense-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';

export function makeCreateFixedExpenseUseCase() {
  const findExpenseByDateRangeRepository = new PrismaExpenseRepositoryAdapter();
  const dateFnsAdapter = new DateFnsAdapter();
  const useCase = new CreateFixedExpenseUseCase(
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    findExpenseByDateRangeRepository,
    findExpenseByDateRangeRepository,
  );

  return useCase;
}
