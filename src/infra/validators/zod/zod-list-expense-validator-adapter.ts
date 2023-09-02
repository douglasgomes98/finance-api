import { z } from 'zod';

import { ListExpenseValidator } from '@/data/protocols/validators/list-expense-validator';

export class ZodListExpenseValidatorAdapter implements ListExpenseValidator {
  validate(params: ListExpenseValidator.Params): ListExpenseValidator.Result {
    const schema = z.object({
      userId: z.string(),
      month: z.number().min(1).max(12),
      year: z.number().min(1970).max(2100),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
