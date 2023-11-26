import { UserTokenModel } from '@/domain/entities/user-token-model';

export type DecryptSessionProtocol = {
  decrypt: (digest: string) => Promise<UserTokenModel | null>;
};
