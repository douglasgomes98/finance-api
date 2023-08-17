import { z } from 'zod';

import { NormalizeNameProtocol } from '@/data/protocols/formatters/normalize-name-protocol';
import { UpdateCategoryValidator } from '@/data/protocols/validators/update-category-validator';

export class ZodUpdateCategoryValidatorAdapter
  implements UpdateCategoryValidator
{
  constructor(private readonly normalizeNameProtocol: NormalizeNameProtocol) {}

  validate(
    params: UpdateCategoryValidator.Params,
  ): UpdateCategoryValidator.Result {
    const schema = z.object({
      categoryId: z.string().uuid(),
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
