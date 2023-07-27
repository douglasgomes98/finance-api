import { BankModel } from '../entities/bank-model';

export namespace FindBankById {
  export type Params = {
    id: string;
  };

  export type Result = BankModel;
}
