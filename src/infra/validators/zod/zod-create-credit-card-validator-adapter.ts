import { z } from 'zod';

import { NormalizeNameProtocol } from '@/data/protocols/formatters/normalize-name-protocol';
import { CreateCreditCardValidator } from '@/data/protocols/validators/create-credit-card-validator';

export class ZodCreateCreditCardValidatorAdapter
  implements CreateCreditCardValidator
{
  constructor(private readonly formatterAdapter: NormalizeNameProtocol) {}

  validate(
    params: CreateCreditCardValidator.Params,
  ): CreateCreditCardValidator.Result {
    const schema = z.object({
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(this.formatterAdapter.normalizeName),
      dueDay: z.number().min(1).max(31),
      closingDay: z.number().min(1).max(31),
      limit: z.number().positive(),
      userId: z.string().nonempty().uuid(),
      bankId: z.string().nonempty().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
