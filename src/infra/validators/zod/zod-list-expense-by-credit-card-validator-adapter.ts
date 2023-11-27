import { z } from 'zod';

import { ListExpenseByCreditCardValidator } from '@/data/protocols/validators/list-expense-by-credit-card-validator';

export class ZodListExpenseByCreditCardValidatorAdapter
  implements ListExpenseByCreditCardValidator
{
  validate(
    params: ListExpenseByCreditCardValidator.Params,
  ): ListExpenseByCreditCardValidator.Result {
    const schema = z.object({
      creditCardId: z.string().uuid(),
      month: z.number().min(1).max(12),
      year: z.number().min(0),
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
