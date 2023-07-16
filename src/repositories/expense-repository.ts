import { ExpenseModel } from '@/entities/expense-model';

export type ExpenseRepositoryDTO = ExpenseModel;

export type CreateExpenseRepositoryDTO = Omit<ExpenseRepositoryDTO, 'id'>;

export type FindByDateRangeRepositoryDTO = {
  startDate: Date;
  endDate: Date;
};

export type FindByCreditCardIdAndDateRangeRepositoryDTO = {
  creditCardId: string;
  startDate: Date;
  endDate: Date;
};

export type ExpenseRepository = {
  findByDateRange: (
    data: FindByDateRangeRepositoryDTO,
  ) => Promise<ExpenseRepositoryDTO[]>;
  findByCreditCardIdAndDateRange: (
    data: FindByCreditCardIdAndDateRangeRepositoryDTO,
  ) => Promise<ExpenseRepositoryDTO[]>;
  create: (data: CreateExpenseRepositoryDTO) => Promise<ExpenseRepositoryDTO>;
  createMany: (
    data: CreateExpenseRepositoryDTO[],
  ) => Promise<ExpenseRepositoryDTO[]>;
};
