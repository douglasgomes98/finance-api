import { ListExpenseByCreditCard } from '@/domain/use-cases/list-expense-by-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindExpenseByCreditCardIdAndDateRangeRepository } from '../protocols/database/find-expense-by-credit-card-id-and-date-range-repository';
import { AddDaysProtocol } from '../protocols/date/add-days-protocol';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { MountDateProtocol } from '../protocols/date/mount-date-protocol';
import { FindCreditCardByIdUseCase } from './find-credit-card-by-id';

export class ListExpenseByCreditCardUseCase
  implements
    UseCase<ListExpenseByCreditCard.Params, ListExpenseByCreditCard.Result>
{
  constructor(
    private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
    private readonly mountDateProtocol: MountDateProtocol,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly addDaysProtocol: AddDaysProtocol,
    private readonly findExpenseByCreditCardIdAndDateRangeRepository: FindExpenseByCreditCardIdAndDateRangeRepository,
  ) {}

  async execute({
    creditCardId,
    month,
    year,
  }: ListExpenseByCreditCard.Params): Promise<ListExpenseByCreditCard.Result> {
    const creditCard = await this.findCreditCardByIdUseCase.execute({
      id: creditCardId,
    });

    const endDayFilter = this.mountDateProtocol.mountDate(
      year,
      month,
      creditCard.closingDay,
    );
    const startDayFilter = this.addMonthsProtocol.addMonths(endDayFilter, -1);

    const expenses =
      await this.findExpenseByCreditCardIdAndDateRangeRepository.findByCreditCardIdAndDateRange(
        {
          creditCardId,
          startDate: startDayFilter,
          endDate: this.addDaysProtocol.addDays(endDayFilter, -1),
        },
      );

    return expenses;
  }
}
