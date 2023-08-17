import { z } from 'zod';

import { ListCategoryValidator } from '@/data/protocols/validators/list-category-validator';

export class ZodListCategoryValidatorAdapter implements ListCategoryValidator {
  validate(params: ListCategoryValidator.Params): ListCategoryValidator.Result {
    const schema = z.object({
      userId: z.string().uuid(),
    });

    const safeParams = schema.parse(params);

    return safeParams;
  }
}
