import { CreditCardModel } from '../entities/credit-card-model';

export namespace FindCreditCardById {
  export type Params = {
    id: string;
  };

  export type Result = CreditCardModel;
}
