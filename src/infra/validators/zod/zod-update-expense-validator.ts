import { z } from 'zod';

import { UpdateExpenseValidator } from '@/data/protocols/validators/update-expense-validator';

export class ZodUpdateExpenseValidator implements UpdateExpenseValidator {
  validate(
    params: UpdateExpenseValidator.Params,
  ): UpdateExpenseValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
      data: z.object({
        categoryId: z.string().optional(),
        creditCardId: z.string().optional(),
        value: z.number().optional(),
      }),
      all: z.boolean().optional(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
