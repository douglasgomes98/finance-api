import { CreditCardModel } from '@/domain/entities/credit-card-model';

export namespace UpdateCreditCardRepository {
  export type Params = {
    id: string;
    data: Partial<CreditCardModel>;
  };

  export type Result = CreditCardModel;
}

export type UpdateCreditCardRepository = {
  update: (
    params: UpdateCreditCardRepository.Params,
  ) => Promise<UpdateCreditCardRepository.Result>;
};
