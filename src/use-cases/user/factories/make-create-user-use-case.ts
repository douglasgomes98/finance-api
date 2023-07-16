import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../create-user";
import { AuthenticationServiceImpl } from "@/services/impl/authentication-service-impl";

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository();
  const authenticationService = new AuthenticationServiceImpl();
  const useCase = new CreateUserUseCase(userRepository, authenticationService);

  return useCase;
}
