import { z } from 'zod';

import { DeleteExpenseValidator } from '@/data/protocols/validators/delete-expense-validator';

export class ZodDeleteExpenseValidatorAdapter
  implements DeleteExpenseValidator
{
  validate(
    params: DeleteExpenseValidator.Params,
  ): DeleteExpenseValidator.Result {
    const schema = z.object({
      expenseId: z.string().uuid(),
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
