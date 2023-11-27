import jwt from 'jsonwebtoken';

import { CreateSessionProtocol } from '@/data/protocols/cryptography/create-session-protocol';
import { DecryptSessionProtocol } from '@/data/protocols/cryptography/decrypt-session-protocol';
import { UserTokenModel } from '@/domain/entities/user-token-model';
import { ENV } from '@/main/configurations/environment';
import { VerifySessionProtocol } from '@/data/protocols/cryptography/verify-session-protocol';

export class JwtAdapter
  implements
    CreateSessionProtocol,
    DecryptSessionProtocol,
    VerifySessionProtocol
{
  async create(data: UserTokenModel): Promise<string> {
    return jwt.sign(data, ENV.JWT_SECRET, {
      issuer: data.id,
      expiresIn: '1h',
      algorithm: 'HS256',
    });
  }

  async decrypt(digest: string): Promise<UserTokenModel | null> {
    const data = jwt.decode(digest, { json: true });

    if (!data) {
      return null;
    }

    const user: UserTokenModel = {
      id: data.id,
      email: data.email,
      name: data.name,
    };

    return user;
  }

  async verify(digest: string): Promise<boolean> {
    try {
      jwt.verify(digest, ENV.JWT_SECRET, { algorithms: ['HS256'] });

      return true;
    } catch (error) {
      return false;
    }
  }
}
