import { CreditCardModel } from '@/domain/entities/credit-card-model';

export namespace FindCreditCardByUserRepository {
  export type Params = {
    id: string;
  };

  export type Result = CreditCardModel[];
}

export type FindCreditCardByUserRepository = {
  findByUser: (
    data: FindCreditCardByUserRepository.Params,
  ) => Promise<FindCreditCardByUserRepository.Result>;
};
