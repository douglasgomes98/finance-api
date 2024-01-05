import { z } from 'zod';

import { ListExpenseByWalletAndCategoryValidator } from '@/data/protocols/validators/list-expense-by-wallet-and-category-validator';

export class ZodListExpenseByWalletAndCategoryValidatorAdapter
  implements ListExpenseByWalletAndCategoryValidator
{
  validate(
    params: ListExpenseByWalletAndCategoryValidator.Params,
  ): ListExpenseByWalletAndCategoryValidator.Result {
    const schema = z.object({
      month: z.number().min(1).max(12),
      year: z.number().min(0),
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
