import { z } from 'zod';

import { NormalizeNameProtocol } from '@/data/protocols/formatters/normalize-name-protocol';
import { CreateCategoryValidator } from '@/data/protocols/validators/create-category-validator';

export class ZodCreateCategoryValidatorAdapter
  implements CreateCategoryValidator
{
  constructor(private readonly normalizeNameProtocol: NormalizeNameProtocol) {}

  validate(
    params: CreateCategoryValidator.Params,
  ): CreateCategoryValidator.Result {
    const schema = z.object({
      userId: z.string().uuid(),
      name: z
        .string()
        .nonempty()
        .trim()
        .transform(this.normalizeNameProtocol.normalizeName),
      color: z
        .string()
        .length(7)
        .regex(/^#[0-9a-f]{6}$/i)
        .trim()
        .transform(value => value.toUpperCase()),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
