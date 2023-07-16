import { ExpenseModel } from '@/entities/expense-model';
import { ExpenseRepository } from '@/repositories/expense-repository';
import { DateService } from '@/services/date-service';

import { UseCase } from '../use-case';

type ListExpenseUseCaseRequest = {
  month: number;
  year: number;
};

type ListExpenseUseCaseResponse = {
  data: ExpenseModel[];
};

export class ListExpenseUseCase
  implements UseCase<ListExpenseUseCaseRequest, ListExpenseUseCaseResponse>
{
  constructor(
    private readonly dateService: DateService,
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async execute({
    month,
    year,
  }: ListExpenseUseCaseRequest): Promise<ListExpenseUseCaseResponse> {
    const endDayFilter = new Date(year, month - 1, 1);
    const startDayFilter = this.dateService.addMonths(endDayFilter, -1);

    const expenses = await this.expenseRepository.findByDateRange({
      startDate: startDayFilter,
      endDate: endDayFilter,
    });

    return { data: expenses };
  }
}
