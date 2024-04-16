import { CreateFixedExpenseUseCase } from '@/data/use-cases/create-fixed-expense-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';

export function makeCreateFixedExpenseUseCase() {
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();

  const dateFnsAdapter = new DateFnsAdapter();
  const useCase = new CreateFixedExpenseUseCase(
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    prismaCreditCardRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
  );

  return useCase;
}
