import { User } from '@prisma/client';

import { UserRepositoryDTO } from '../user-repository';
import { Mapper } from './mapper';

class UserMapper implements Mapper<UserRepositoryDTO, User> {
  toRepository(data: UserRepositoryDTO): Partial<User> {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  }

  toEntity(data: User): UserRepositoryDTO {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  }
}

export const userMapper = new UserMapper();
