import { ChangeExpenseInvoiceDateUseCase } from '@/data/use-cases/change-expense-invoice-date-use-case';
import { PrismaExpenseRepositoryAdapter } from '@/infra/database/postgresql/prisma-expense-repository-adapter';
import { DateFnsAdapter } from '@/infra/date/date-fns/date-fns-adapter';
import { ZodChangeExpenseInvoiceDateValidatorAdapter } from '@/infra/validators/zod/zod-change-expense-invoice-date-validator-adapter';

export function makeChangeExpenseInvoiceDateUseCase() {
  const zodChangeExpenseInvoiceDateValidatorAdapter =
    new ZodChangeExpenseInvoiceDateValidatorAdapter();
  const dateFnsAdapter = new DateFnsAdapter();
  const prismaExpenseRepositoryAdapter = new PrismaExpenseRepositoryAdapter();
  const changeExpenseInvoiceDateUseCase = new ChangeExpenseInvoiceDateUseCase(
    zodChangeExpenseInvoiceDateValidatorAdapter,
    dateFnsAdapter,
    prismaExpenseRepositoryAdapter,
    prismaExpenseRepositoryAdapter,
  );

  return changeExpenseInvoiceDateUseCase;
}
