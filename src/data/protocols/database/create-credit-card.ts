import { CreditCardModel } from '@/domain/entities/credit-card-model';

export namespace CreateCreditCardRepository {
  export type Params = Omit<CreditCardModel, 'id'>;

  export type Result = CreditCardModel;
}

export type CreateCreditCardRepository = {
  create: (
    data: CreateCreditCardRepository.Params,
  ) => Promise<CreateCreditCardRepository.Result>;
};
