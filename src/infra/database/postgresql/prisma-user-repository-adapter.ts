import { FindUserByEmailRepository } from '@/data/protocols/database/find-user-by-email-repository';
import { FindUserByIdRepository } from '@/data/protocols/database/find-user-by-id-repository';
import { CreateUserRepository } from '@/data/protocols/database/create-user-repository';

import { database } from './database';
import { userMapper } from './mappers/user-mapper';

export class PrismaUserRepositoryAdapter
  implements
    FindUserByEmailRepository,
    FindUserByIdRepository,
    CreateUserRepository
{
  async findByEmail({
    email,
  }: FindUserByEmailRepository.Params): Promise<FindUserByEmailRepository.Result> {
    const row = await database.user.findFirst({
      where: { email },
    });

    if (!row) return null;

    return userMapper.toEntity(row);
  }

  async findById({
    id,
  }: FindUserByIdRepository.Params): Promise<FindUserByIdRepository.Result> {
    const row = await database.user.findUnique({
      where: { id },
    });

    if (!row) return null;

    return userMapper.toEntity(row);
  }

  async create(
    data: CreateUserRepository.Params,
  ): Promise<CreateUserRepository.Result> {
    const row = await database.user.create({
      data,
    });

    return userMapper.toEntity(row);
  }
}
