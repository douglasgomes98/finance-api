import { z } from 'zod';

import { ListExpenseByWalletValidator } from '@/data/protocols/validators/list-expense-by-wallet-validator';

export class ZodListExpenseByWalletValidatorAdapter
  implements ListExpenseByWalletValidator
{
  validate(
    params: ListExpenseByWalletValidator.Params,
  ): ListExpenseByWalletValidator.Result {
    const schema = z.object({
      month: z.number().min(1).max(12),
      year: z.number().min(0),
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
