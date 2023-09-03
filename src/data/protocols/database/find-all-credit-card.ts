import { CreditCardModel } from '@/domain/entities/credit-card-model';

export namespace FindAllCreditCardRepository {
  export type Params = void;

  export type Result = CreditCardModel[];
}

export type FindAllCreditCardRepository = {
  findAll: (
    data: FindAllCreditCardRepository.Params,
  ) => Promise<FindAllCreditCardRepository.Result>;
};
