import { z } from 'zod';

import { FindUserByIdValidator } from '@/data/protocols/validators/find-user-by-id-validator';

export class ZodFindUserByIdValidatorAdapter implements FindUserByIdValidator {
  validate(params: FindUserByIdValidator.Params): FindUserByIdValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
