import { z } from 'zod';

import { CreateUserValidator } from '@/data/protocols/validators/create-user-validator';

export class ZodCreateUserValidatorAdapter implements CreateUserValidator {
  validate(params: CreateUserValidator.Params): CreateUserValidator.Result {
    const schema = z.object({
      name: z.string().min(3).max(255),
      email: z.string().email().min(3).max(255),
      password: z.string().min(6).max(255),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
