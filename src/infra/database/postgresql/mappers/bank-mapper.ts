import { BankModel } from '@/domain/entities/bank-model';
import { Bank } from '@prisma/client';

import { Mapper } from '../../mapper';

class BankMapper implements Mapper<BankModel, Bank> {
  toRepository(data: BankModel): Partial<Bank> {
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      color: data.color,
    };
  }

  toEntity(data: Bank): BankModel {
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      color: data.color,
    };
  }
}

export const bankMapper = new BankMapper();
