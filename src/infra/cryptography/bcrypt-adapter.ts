import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

import { Hasher } from '@/data/protocols/cryptography/hasher';
import { ENV } from '@/main/configurations/environment';
import { CreateId } from '@/data/protocols/cryptography/create-id';

export class BcryptAdapter implements Hasher, CreateId {
  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, ENV.PASSWORD_SALT);
  }

  async createId(): Promise<string> {
    return crypto.randomUUID();
  }
}
