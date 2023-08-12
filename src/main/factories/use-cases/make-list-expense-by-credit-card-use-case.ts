import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
import { ListExpenseByCreditCardUseCase } from '@/data/use-cases/list-expense-by-credit-card-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateServiceAdapter } from '@/infra/date/date-service-adapter';

export function makeListExpenseByCreditCardUseCase() {
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const findCreditCardByIdUseCase = new FindCreditCardByIdUseCase(
    prismaCreditCardRepositoryAdapter,
  );
  const dateServiceAdapter = new DateServiceAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const useCase = new ListExpenseByCreditCardUseCase(
    findCreditCardByIdUseCase,
    dateServiceAdapter,
    dateServiceAdapter,
    dateServiceAdapter,
    prismaExpenseRepositoryAdapter,
  );

  return useCase;
}
