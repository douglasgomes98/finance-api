import { UserWithoutPassword } from '@/domain/entities/user-model';
import { User } from '@prisma/client';

import { Mapper } from '../../mapper';

class UserMapper implements Mapper<UserWithoutPassword, User> {
  toRepository(data: UserWithoutPassword): Partial<User> {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  }

  toEntity(data: User): UserWithoutPassword {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  }
}

export const userMapper = new UserMapper();
