import { z } from 'zod';

import { DeleteCategoryValidator } from '@/data/protocols/validators/delete-category-validator';

export class ZodDeleteCategoryValidatorAdapter
  implements DeleteCategoryValidator
{
  validate(
    params: DeleteCategoryValidator.Params,
  ): DeleteCategoryValidator.Result {
    const schema = z.object({
      categoryId: z.string().uuid(),
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
