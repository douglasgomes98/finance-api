import { userMapper } from "../mappers/user-mapper";
import {
  UserCreateRepositoryDTO,
  UserRepository,
  UserRepositoryDTO,
} from "../user-repository";
import { database } from "./database";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserRepositoryDTO | null> {
    const row = await database.user.findFirst({
      where: { email },
    });

    if (!row) return null;

    return userMapper.toEntity(row);
  }

  async create(data: UserCreateRepositoryDTO): Promise<UserRepositoryDTO> {
    const row = await database.user.create({
      data,
    });

    return userMapper.toEntity(row);
  }
}
