import { CreateFixedExpensesUseCase } from '@/data/use-cases/create-fixed-expenses-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';

export function makeCreateFixedExpensesUseCase() {
  const findExpenseByDateRangeRepository = new PrismaExpenseRepositoryAdapter();
  const dateFnsAdapter = new DateFnsAdapter();
  const useCase = new CreateFixedExpensesUseCase(
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    findExpenseByDateRangeRepository,
    findExpenseByDateRangeRepository,
  );

  return useCase;
}
