import { z } from 'zod';

import { ListCreditCardValidator } from '@/data/protocols/validators/list-credit-card-validator';

export class ZodListCreditCardValidatorAdapter
  implements ListCreditCardValidator
{
  validate(
    params: ListCreditCardValidator.Params,
  ): ListCreditCardValidator.Result {
    const schema = z.object({
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
