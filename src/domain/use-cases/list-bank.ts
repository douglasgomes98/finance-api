import { BankModel } from '../entities/bank-model';

export namespace ListBank {
  export type Params = void;

  export type Result = BankModel[];
}
