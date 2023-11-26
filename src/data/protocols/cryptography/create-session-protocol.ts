import { UserToken } from '@/domain/entities/user-token';

export type CreateSessionProtocol = {
  create: (data: UserToken) => Promise<string>;
};
