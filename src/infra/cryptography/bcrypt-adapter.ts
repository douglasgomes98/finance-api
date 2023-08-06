import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

import { HasherProtocol } from '@/data/protocols/cryptography/hasher-protocol';
import { ENV } from '@/main/configurations/environment';
import { CreateIdProtocol } from '@/data/protocols/cryptography/create-id-protocol';

export class BcryptAdapter implements HasherProtocol, CreateIdProtocol {
  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, ENV.PASSWORD_SALT);
  }

  async createId(): Promise<string> {
    return crypto.randomUUID();
  }
}
