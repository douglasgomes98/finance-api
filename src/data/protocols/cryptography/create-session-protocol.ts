import { UserTokenModel } from '@/domain/entities/user-token-model';

export type CreateSessionProtocol = {
  create: (data: UserTokenModel) => Promise<string>;
};
