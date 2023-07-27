import { BankModel } from '@/domain/entities/bank-model';

export namespace FindBankRepository {
  export type Params = void;

  export type Result = BankModel[];
}

export type FindBankRepository = {
  find: (
    params: FindBankRepository.Params,
  ) => Promise<FindBankRepository.Result>;
};
