import { z } from 'zod';

import { ListExpenseByCategoryValidator } from '@/data/protocols/validators/list-expense-by-category-validator';

export class ZodListExpenseByCategoryValidatorAdapter
  implements ListExpenseByCategoryValidator
{
  validate(params: ListExpenseByCategoryValidator.Params) {
    const schema = z.object({
      userId: z.string().uuid(),
      month: z.number().min(1).max(12),
      year: z.number().min(0),
    });

    return schema.parse(params);
  }
}
