import { CreditCardModel } from '@/domain/entities/credit-card-model';

export namespace FindCreditCardByUserAndNameRepository {
  export type Params = {
    userId: string;
    name: string;
  };

  export type Result = CreditCardModel | null;
}

export type FindCreditCardByUserAndNameRepository = {
  findByUserAndName: (
    data: FindCreditCardByUserAndNameRepository.Params,
  ) => Promise<FindCreditCardByUserAndNameRepository.Result>;
};
