import { UserToken } from '@/domain/entities/user-token';

export type DecryptSessionProtocol = {
  decrypt: (digest: string) => Promise<UserToken | null>;
};
