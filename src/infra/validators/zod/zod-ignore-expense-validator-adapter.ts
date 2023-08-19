import { z } from 'zod';

import { IgnoreExpenseValidator } from '@/data/protocols/validators/ignore-expense-validator';

export class ZodIgnoreExpenseValidatorAdapter
  implements IgnoreExpenseValidator
{
  validate(
    params: IgnoreExpenseValidator.Params,
  ): IgnoreExpenseValidator.Params {
    const schema = z.object({
      id: z.string().uuid(),
      isIgnored: z.boolean(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
