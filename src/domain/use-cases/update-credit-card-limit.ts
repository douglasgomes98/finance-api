import { CreditCardModel } from '../entities/credit-card-model';

export namespace UpdateCreditCardLimit {
  export type Params = {
    id: string;
    userId: string;
  };

  export type Result = CreditCardModel;
}
