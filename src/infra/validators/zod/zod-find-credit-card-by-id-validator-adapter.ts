import { z } from 'zod';

import { FindCreditCardByIdValidator } from '@/data/protocols/validators/find-credit-card-by-id-validator';

export class ZodFindCreditCardByIdValidatorAdapter
  implements FindCreditCardByIdValidator
{
  validate(
    params: FindCreditCardByIdValidator.Params,
  ): FindCreditCardByIdValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
