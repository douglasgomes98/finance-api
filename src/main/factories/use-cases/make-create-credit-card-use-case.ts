import { CreateCreditCardUseCase } from '@/data/use-cases/create-credit-card-use-case';
import { FindBankByIdUseCase } from '@/data/use-cases/find-bank-by-id-use-case';
import { FindUserByIdUseCase } from '@/data/use-cases/find-user-by-id-use-case';
import { PrismaBankRepositoryAdapter } from '@/infra/database/postgresql/prisma-bank-repository-adapter';
import { PrismaCreditCardRepositoryAdapter } from '@/infra/database/postgresql/prisma-credit-card-repository-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { FormatterAdapter } from '@/infra/formatters/formatter-adapter';
import { ZodCreateCreditCardValidatorAdapter } from '@/infra/validators/zod/zod-create-credit-card-validator-adapter';
import { ZodFindBankByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-bank-by-id-validator-adapter';
import { ZodFindUserByIdValidatorAdapter } from '@/infra/validators/zod/zod-find-user-by-id-validator-adapter';

export function makeCreateCreditCardUseCase() {
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const zodFindUserByIdValidatorAdapter = new ZodFindUserByIdValidatorAdapter();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    prismaUserRepositoryAdapter,
    zodFindUserByIdValidatorAdapter,
  );
  const prismaCreditCardRepositoryAdapter =
    new PrismaCreditCardRepositoryAdapter();
  const prismaBankRepositoryAdapter = new PrismaBankRepositoryAdapter();
  const zodFindBankByIdValidatorAdapter = new ZodFindBankByIdValidatorAdapter();
  const findBankByIdUseCase = new FindBankByIdUseCase(
    prismaBankRepositoryAdapter,
    zodFindBankByIdValidatorAdapter,
  );
  const formatterAdapter = new FormatterAdapter();
  const zodCreateCreditCardValidatorAdapter =
    new ZodCreateCreditCardValidatorAdapter(formatterAdapter);
  const useCase = new CreateCreditCardUseCase(
    findUserByIdUseCase,
    prismaCreditCardRepositoryAdapter,
    prismaCreditCardRepositoryAdapter,
    findBankByIdUseCase,
    zodCreateCreditCardValidatorAdapter,
  );

  return useCase;
}
