import { CreateFixedCreditCardExpenseUseCase } from '@/data/use-cases/create-fixed-credit-card-expense-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';

export function makeCreateFixedCreditCardExpenseUseCase() {
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();

  const dateFnsAdapter = new DateFnsAdapter();
  const useCase = new CreateFixedCreditCardExpenseUseCase(
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
