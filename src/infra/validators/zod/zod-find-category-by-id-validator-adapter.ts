import { z } from 'zod';

import { FindCategoryByIdValidator } from '@/data/protocols/validators/find-category-by-id-validator';

export class ZodFindCategoryByIdValidatorAdapter
  implements FindCategoryByIdValidator
{
  validate(
    params: FindCategoryByIdValidator.Params,
  ): FindCategoryByIdValidator.Result {
    const schema = z.object({
      id: z.string().uuid(),
      userId: z.string().uuid().optional(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
