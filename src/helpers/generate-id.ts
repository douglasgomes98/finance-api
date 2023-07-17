import crypto from 'node:crypto';

export function generateId(): string {
  return crypto.randomUUID();
}
