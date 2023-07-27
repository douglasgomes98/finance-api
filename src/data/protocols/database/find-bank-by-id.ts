import { BankModel } from '@/domain/entities/bank-model';

export namespace FindBankByIdRepository {
  export type Params = {
    id: string;
  };

  export type Result = BankModel | null;
}

export type FindBankByIdRepository = {
  findBankById: (
    params: FindBankByIdRepository.Params,
  ) => Promise<FindBankByIdRepository.Result>;
};
