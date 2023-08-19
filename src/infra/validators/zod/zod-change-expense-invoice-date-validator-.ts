import { z } from 'zod';

import { ChangeExpenseInvoiceDateValidator } from '@/data/protocols/validators/change-expense-invoice-date-validator';

export class ZodChangeExpenseInvoiceDateValidatorAdapter
  implements ChangeExpenseInvoiceDateValidator
{
  validate(
    params: ChangeExpenseInvoiceDateValidator.Params,
  ): ChangeExpenseInvoiceDateValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
      increaseInvoiceMonth: z.number().int().min(-12).max(12),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
