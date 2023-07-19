import { CreditCardModel } from '../entities/credit-card-model';

export namespace ListCreditCard {
  export type Params = {
    userId: string;
  };

  export type Result = CreditCardModel[];
}
