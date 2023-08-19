import { z } from 'zod';

import { UpdateCreditCardLimitValidator } from '@/data/protocols/validators/update-credit-card-limit-validator';

export class ZodUpdateCreditCardLimitValidatorAdapter
  implements UpdateCreditCardLimitValidator
{
  validate(
    params: UpdateCreditCardLimitValidator.Params,
  ): UpdateCreditCardLimitValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
