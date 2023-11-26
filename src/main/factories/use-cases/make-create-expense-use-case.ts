import { CreateExpenseUseCase } from '@/data/use-cases/create-expense-use-case';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';
import { ZodCreateExpenseValidatorAdapter } from '@/infra/validators/zod/zod-create-expense-validator-adapter';

import { makeFindCategoryByIdUseCase } from './make-find-category-by-id-use-case';
import { makeFindCreditCardByIdUseCase } from './make-find-credit-card-by-id-use-case';
import { makeFindUserByIdUseCase } from './make-find-user-by-id-use-case';
import { makeUpdateCreditCardLimitUseCase } from './make-update-credit-card-limit-use-case';

export function makeCreateExpenseUseCase() {
  const findCategoryByIdUseCase = makeFindCategoryByIdUseCase();
  const findCreditCardByIdUseCase = makeFindCreditCardByIdUseCase();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const updateCreditCardLimitUseCase = makeUpdateCreditCardLimitUseCase();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const dateFnsAdapter = new DateFnsAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const zodCreateExpenseValidatorAdapter =
    new ZodCreateExpenseValidatorAdapter();
  const useCase = new CreateExpenseUseCase(
    findCategoryByIdUseCase,
    findCreditCardByIdUseCase,
    findUserByIdUseCase,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
    dateFnsAdapter,
    dateFnsAdapter,
    bcryptAdapter,
    zodCreateExpenseValidatorAdapter,
    updateCreditCardLimitUseCase,
  );

  return useCase;
}
