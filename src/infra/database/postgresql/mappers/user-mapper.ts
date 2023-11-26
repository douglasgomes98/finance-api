import { UserModel } from '@/domain/entities/user-model';
import { User } from '@prisma/client';

import { Mapper } from '../../mapper';

class UserMapper implements Mapper<UserModel, User> {
  toRepository(data: UserModel): Partial<User> {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
    };
  }

  toEntity(data: User): UserModel {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
    };
  }
}

export const userMapper = new UserMapper();
