import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
import { ListExpenseByCreditCardUseCase } from '@/data/use-cases/list-expense-by-credit-card-use-case';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';
import { ZodFindCreditCardByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-credit-card-by-id-validator-adapter';
import { ZodListExpenseByCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-by-credit-card-validator-adapter';

export function makeListExpenseByCreditCardUseCase() {
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const zodFindCreditCardByIdValidatorAdapter =
    new ZodFindCreditCardByIdValidatorAdapter();
  const findCreditCardByIdUseCase = new FindCreditCardByIdUseCase(
    prismaCreditCardRepositoryAdapter,
    zodFindCreditCardByIdValidatorAdapter,
  );
  const dateFnsAdapter = new DateFnsAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const zodListExpenseByCreditCardValidatorAdapter =
    new ZodListExpenseByCreditCardValidatorAdapter();
  const useCase = new ListExpenseByCreditCardUseCase(
    findCreditCardByIdUseCase,
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    prismaExpenseRepositoryAdapter,
    zodListExpenseByCreditCardValidatorAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
  );

  return useCase;
}
