import { CreditCardModel } from '../entities/credit-card-model';

export namespace CreateCreditCard {
  export type Params = Omit<CreditCardModel, 'id'>;

  export type Result = CreditCardModel;
}
