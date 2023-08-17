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
import { ZodCreateExpenseValidatorAdapter } from '@/infra/validators/zod/zod-create-expense-validator-adapter';
import { ZodFindCategoryByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-category-by-id-validator-adapter';
import { ZodFindCreditCardByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-credit-card-by-id-validator-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';

export function makeCreateExpenseUseCase() {
  const prismaCategoryRepositoryAdapter = new PrismaCategoryRepositoryAdapter();
  const zodFindCategoryByIdValidatorAdapter =
    new ZodFindCategoryByIdValidatorAdapter();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    prismaCategoryRepositoryAdapter,
    zodFindCategoryByIdValidatorAdapter,
  );
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const zodFindCreditCardByIdValidatorAdapter =
    new ZodFindCreditCardByIdValidatorAdapter();
  const findCreditCardByIdUseCase = new FindCreditCardByIdUseCase(
    prismaCreditCardRepositoryAdapter,
    zodFindCreditCardByIdValidatorAdapter,
  );
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const dateServiceAdapter = new DateServiceAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const zodCreateExpenseValidatorAdapter =
    new ZodCreateExpenseValidatorAdapter();
  const useCase = new CreateExpenseUseCase(
    findCategoryByIdUseCase,
    findCreditCardByIdUseCase,
    findUserByIdUseCase,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    dateServiceAdapter,
    dateServiceAdapter,
    bcryptAdapter,
    zodCreateExpenseValidatorAdapter,
  );

  return useCase;
}
