import { z } from 'zod';

import { PaidExpenseValidator } from '@/data/protocols/validators/paid-expense-validator';

export class ZodPaidExpenseValidatorAdapter implements PaidExpenseValidator {
  validate(params: PaidExpenseValidator.Params): PaidExpenseValidator.Results {
    const schema = z.object({
      id: z.string().uuid(),
      isPaid: z.boolean(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
