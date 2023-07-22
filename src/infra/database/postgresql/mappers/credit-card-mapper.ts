import { CreditCardModel } from '@/domain/entities/credit-card-model';
import { CreditCard } from '@prisma/client';

import { Mapper } from '../../mapper';

class CreditCardMapper implements Mapper<CreditCardModel, CreditCard> {
  toRepository(data: CreditCardModel): Partial<CreditCard> {
    return {
      id: data.id,
      name: data.name,
      color: data.color,
      limit: data.limit,
      dueDay: data.dueDay,
      closingDay: data.closingDay,
      userId: data.userId,
    };
  }

  toEntity(data: CreditCard): CreditCardModel {
    return {
      id: data.id,
      name: data.name,
      color: data.color,
      limit: data.limit,
      dueDay: data.dueDay,
      closingDay: data.closingDay,
      userId: data.userId as string,
    };
  }
}

export const creditCardMapper = new CreditCardMapper();
