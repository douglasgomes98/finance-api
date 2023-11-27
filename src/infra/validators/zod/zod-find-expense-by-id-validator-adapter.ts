import { z } from 'zod';

import { FindExpenseByIdValidator } from '@/data/protocols/validators/find-expense-by-id-validator';

export class ZodFindExpenseByIdValidatorAdapter
  implements FindExpenseByIdValidator
{
  validate(
    params: FindExpenseByIdValidator.Params,
  ): FindExpenseByIdValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
      userId: z.string().uuid().optional(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
