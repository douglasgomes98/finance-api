import { BankModel } from '@/domain/entities/bank-model';
import { Bank } from '@prisma/client';

import { Mapper } from '../../mapper';

class BankMapper implements Mapper<BankModel, Bank> {
  toRepository(data: BankModel): Partial<Bank> {
    return {
      id: data.id,
      name: data.name,
      image: data.image,
    };
  }

  toEntity(data: Bank): BankModel {
    return {
      id: data.id,
      name: data.name,
      image: data.image,
    };
  }
}

export const bankMapper = new BankMapper();
