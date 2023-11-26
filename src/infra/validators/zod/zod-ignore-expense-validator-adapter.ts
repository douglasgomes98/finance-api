import { z } from 'zod';

import { IgnoreExpenseValidator } from '@/data/protocols/validators/ignore-expense-validator';

export class ZodIgnoreExpenseValidatorAdapter
  implements IgnoreExpenseValidator
{
  validate(
    params: IgnoreExpenseValidator.Params,
  ): IgnoreExpenseValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
      isIgnored: z.boolean(),
      all: z.boolean().optional(),
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
