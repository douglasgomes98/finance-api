import { z } from 'zod';

import { ListExpenseByCreditCardAndCategoryValidator } from '@/data/protocols/validators/list-expense-by-credit-card-and-category-validator';

export class ZodListExpenseByCreditCardAndCategoryValidatorAdapter
  implements ListExpenseByCreditCardAndCategoryValidator
{
  validate(params: ListExpenseByCreditCardAndCategoryValidator.Params) {
    const schema = z.object({
      creditCardId: z.string().uuid(),
      userId: z.string().uuid(),
      month: z.number().min(1).max(12),
      year: z.number().min(0),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
