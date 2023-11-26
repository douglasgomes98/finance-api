import { AuthenticateUseCase } from '@/data/use-cases/authenticate-use-case';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter';
import { PrismaUserRepositoryAdapter } from '@/infra/database/postgresql/prisma-user-repository-adapter';
import { ZodAuthenticateValidatorAdapter } from '@/infra/validators/zod/zod-authenticate-validator-adapter';

export function makeAuthenticateUseCase() {
  const zodAuthenticateValidatorAdapter = new ZodAuthenticateValidatorAdapter();
  const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const jwtAdapter = new JwtAdapter();
  const useCase = new AuthenticateUseCase(
    zodAuthenticateValidatorAdapter,
    prismaUserRepositoryAdapter,
    bcryptAdapter,
    jwtAdapter,
  );

  return useCase;
}
