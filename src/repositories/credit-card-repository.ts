import { CreditCardModel } from '@/entities/credit-card-model';

export type CreditCardRepositoryDTO = CreditCardModel;

export type CreditCardFindByUserAndNameRepositoryDTO = Pick<
  CreditCardModel,
  'userId' | 'name'
>;

export type CreditCardCreateRepositoryDTO = Omit<CreditCardModel, 'id'>;

export type CreditCardRepository = {
  findById: (id: string) => Promise<CreditCardRepositoryDTO | null>;
  findByUserAndName: (
    data: CreditCardFindByUserAndNameRepositoryDTO,
  ) => Promise<CreditCardRepositoryDTO | null>;
  findByUserId: (userId: string) => Promise<CreditCardRepositoryDTO[]>;
  create: (
    data: CreditCardCreateRepositoryDTO,
  ) => Promise<CreditCardRepositoryDTO>;
};
