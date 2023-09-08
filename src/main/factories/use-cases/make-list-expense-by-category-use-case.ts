import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { ListCategoryUseCase } from '@/data/use-cases/list-category-use-case';
import { ListCreditCardUseCase } from '@/data/use-cases/list-credit-card-use-case';
import { ListExpenseByCategoryUseCase } from '@/data/use-cases/list-expense-by-category-use-case';
import { ListExpenseByCreditCardUseCase } from '@/data/use-cases/list-expense-by-credit-card-use-case';
import { ListExpenseUseCase } from '@/data/use-cases/list-expense-use-case';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';
import { ZodFindCreditCardByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-credit-card-by-id-validator-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';
import { ZodListCategoryValidatorAdapter } from '@/infra/validators/zod/zod-list-category-validator-adapter';
import { ZodListCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-list-credit-card-validator-adapter';
import { ZodListExpenseByCategoryValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-by-category-validator-adapter';
import { ZodListExpenseByCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-by-credit-card-validator-adapter';
import { ZodListExpenseValidatorAdapter } from '@/infra/validators/zod/zod-list-expense-validator-adapter';

export function makeListExpenseByCategoryUseCase() {
  const zodListExpenseByCategoryValidatorAdapter =
    new ZodListExpenseByCategoryValidatorAdapter();
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const zodListCategoryValidatorAdapter = new ZodListCategoryValidatorAdapter();
  const listCategoryUseCase = new ListCategoryUseCase(
    findUserByIdUseCase,
    prismaCategoryRepositoryAdapter,
    zodListCategoryValidatorAdapter,
  );
  const zodListExpenseValidatorAdapter = new ZodListExpenseValidatorAdapter();
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
  const listExpenseByCreditCardUseCase = new ListExpenseByCreditCardUseCase(
    findCreditCardByIdUseCase,
    dateFnsAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    prismaExpenseRepositoryAdapter,
    zodListExpenseByCreditCardValidatorAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
  );
  const zodListCreditCardValidatorAdapter =
    new ZodListCreditCardValidatorAdapter();
  const listCreditCardUseCase = new ListCreditCardUseCase(
    findUserByIdUseCase,
    prismaCreditCardRepositoryAdapter,
    zodListCreditCardValidatorAdapter,
  );
  const listExpenseUseCase = new ListExpenseUseCase(
    zodListExpenseValidatorAdapter,
    listExpenseByCreditCardUseCase,
    listCreditCardUseCase,
  );

  const useCase = new ListExpenseByCategoryUseCase(
    zodListExpenseByCategoryValidatorAdapter,
    listCategoryUseCase,
    listExpenseUseCase,
  );

  return useCase;
}
