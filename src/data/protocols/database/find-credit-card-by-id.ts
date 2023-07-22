import { CreditCardModel } from '@/domain/entities/credit-card-model';

export namespace FindCreditCardByIdRepository {
  export type Params = {
    id: string;
  };

  export type Result = CreditCardModel | null;
}

export type FindCreditCardByIdRepository = {
  findById: (
    data: FindCreditCardByIdRepository.Params,
  ) => Promise<FindCreditCardByIdRepository.Result>;
};
