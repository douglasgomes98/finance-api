import { CreateExpenseUseCase } from '@/data/use-cases/create-expense-use-case';
import { FindCategoryByIdUseCase } from '@/data/use-cases/find-category-by-id-use-case';
import { FindCreditCardByIdUseCase } from '@/data/use-cases/find-credit-card-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { PrismaCategoryRepositoryAdapter } from '@/infra/database/postgresql/prisma-category-repository-adapter';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { DateServiceAdapter } from '@/infra/date/date-service-adapter';

export function makeCreateExpenseUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    prismaCategoryRepositoryAdapter,
  );
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const findCreditCardByIdUseCase = new FindCreditCardByIdUseCase(
    prismaCreditCardRepositoryAdapter,
  );
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
  );
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const dateServiceAdapter = new DateServiceAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const useCase = new CreateExpenseUseCase(
    findCategoryByIdUseCase,
    findCreditCardByIdUseCase,
    findUserByIdUseCase,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    dateServiceAdapter,
    dateServiceAdapter,
    bcryptAdapter,
  );

  return useCase;
}
