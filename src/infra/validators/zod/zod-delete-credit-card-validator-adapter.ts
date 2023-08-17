import { z } from 'zod';

import { DeleteCreditCardValidator } from '@/data/protocols/validators/delete-credit-card-validator';

export class ZodDeleteCreditCardValidatorAdapter
  implements DeleteCreditCardValidator
{
  validate(
    params: DeleteCreditCardValidator.Params,
  ): DeleteCreditCardValidator.Result {
    const schema = z.object({
      creditCardId: z.string().uuid(),
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
