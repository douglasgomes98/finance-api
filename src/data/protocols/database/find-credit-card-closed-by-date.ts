import { CreditCardModel } from '@/domain/entities/credit-card-model';

export namespace FindCreditCardClosedByDateRepository {
  export type Params = {
    date: Date;
  };

  export type Result = CreditCardModel[];
}

export type FindCreditCardClosedByDateRepository = {
  findClosedByDate: (
    data: FindCreditCardClosedByDateRepository.Params,
  ) => Promise<FindCreditCardClosedByDateRepository.Result>;
};
