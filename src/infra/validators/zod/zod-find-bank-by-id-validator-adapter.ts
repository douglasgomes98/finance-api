import { z } from 'zod';

import { FindBankByIdValidator } from '@/data/protocols/validators/find-bank-by-id-validator';

export class ZodFindBankByIdValidatorAdapter implements FindBankByIdValidator {
  validate(params: FindBankByIdValidator.Params): FindBankByIdValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
