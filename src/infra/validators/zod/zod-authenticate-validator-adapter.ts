import { z } from 'zod';

import { AuthenticateValidator } from '@/data/protocols/validators/authenticate-validator';

export class ZodAuthenticateValidatorAdapter implements AuthenticateValidator {
  validate(params: AuthenticateValidator.Params): AuthenticateValidator.Result {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
