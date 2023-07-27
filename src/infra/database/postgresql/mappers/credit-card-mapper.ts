import { CreditCardModel } from '@/domain/entities/credit-card-model';
import { CreditCard } from '@prisma/client';

import { Mapper } from '../../mapper';

class CreditCardMapper implements Mapper<CreditCardModel, CreditCard> {
  toRepository(data: CreditCardModel): Partial<CreditCard> {
    return {
      id: data.id,
      name: data.name,
      dueDay: data.dueDay,
      closingDay: data.closingDay,
      limit: data.limit,
      limitAvailable: data.limitAvailable,
      limitUsed: data.limitUsed,
      percentLimitUsed: data.percentLimitUsed,
      userId: data.userId,
      bankId: data.bankId,
    };
  }

  toEntity(data: CreditCard): CreditCardModel {
    return {
      id: data.id,
      name: data.name,
      dueDay: data.dueDay,
      closingDay: data.closingDay,
      limit: data.limit,
      limitAvailable: data.limitAvailable || 0,
      limitUsed: data.limitUsed || 0,
      percentLimitUsed: data.percentLimitUsed || 0,
      userId: data.userId as string,
      bankId: data.bankId as string,
    };
  }
}

export const creditCardMapper = new CreditCardMapper();
