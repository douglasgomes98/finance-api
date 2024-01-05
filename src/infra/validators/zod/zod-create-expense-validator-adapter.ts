import { z } from 'zod';

import { CreateExpenseValidator } from '@/data/protocols/validators/create-expense-validator';

export class ZodCreateExpenseValidatorAdapter
  implements CreateExpenseValidator
{
  validate(
    params: CreateExpenseValidator.Params,
  ): CreateExpenseValidator.Result {
    const schema = z.object({
      name: z.string().nonempty().trim(),
      value: z.number().positive(),
      purchaseDate: z.date(),
      isFixed: z.boolean(),
      isIgnored: z.boolean(),
      categoryId: z.string().uuid(),
      creditCardId: z.string().uuid().nullable().default(null),
      userId: z.string().uuid(),
      installments: z.number().positive().optional(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
