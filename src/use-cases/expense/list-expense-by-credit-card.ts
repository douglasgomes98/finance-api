import { ExpenseModel } from '@/entities/expense-model';
import { DateService } from '@/services/date-service';
import { ExpenseRepository } from '@/repositories/expense-repository';

import { FindCreditCardByIdUseCase } from '../credit-card/find-credit-card-by-id';
import { UseCase } from '../use-case';

type ListExpenseByCreditCardUseCaseRequest = {
  creditCardId: string;
  month: number;
  year: number;
};

type ListExpenseByCreditCardUseCaseResponse = {
  data: ExpenseModel[];
};

export class ListExpenseByCreditCardUseCase
  implements
    UseCase<
      ListExpenseByCreditCardUseCaseRequest,
      ListExpenseByCreditCardUseCaseResponse
    >
{
  constructor(
    private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
    private readonly dateService: DateService,
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async execute({
    creditCardId,
    month,
    year,
  }: ListExpenseByCreditCardUseCaseRequest): Promise<ListExpenseByCreditCardUseCaseResponse> {
    const creditCard = await this.findCreditCardByIdUseCase.execute({
      id: creditCardId,
    });

    const endDayFilter = new Date(year, month - 1, creditCard.dueDay);
    const startDayFilter = this.dateService.addMonths(endDayFilter, -1);

    const expenses =
      await this.expenseRepository.findByCreditCardIdAndDateRange({
        creditCardId,
        startDate: startDayFilter,
        endDate: endDayFilter,
      });

    return { data: expenses };
  }
}
