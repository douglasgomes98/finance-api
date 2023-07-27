import { CreditCardModel } from '../entities/credit-card-model';

export namespace CreateCreditCard {
  export type Params = Omit<
    CreditCardModel,
    'id' | 'limitAvailable' | 'limitUsed' | 'percentLimitUsed'
  >;

  export type Result = CreditCardModel;
}
