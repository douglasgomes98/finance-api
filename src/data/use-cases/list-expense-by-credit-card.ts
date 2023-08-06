import { ListExpenseByCreditCard } from '@/domain/use-cases/list-expense-by-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindExpenseByCreditCardIdAndDateRangeRepository } from '../protocols/database/find-expense-by-credit-card-id-and-date-range';
import { AddDays } from '../protocols/date/add-days';
import { AddMonths } from '../protocols/date/add-months';
import { MountDate } from '../protocols/date/mount-date';
import { FindCreditCardByIdUseCase } from './find-credit-card-by-id';

export class ListExpenseByCreditCardUseCase
  implements
    UseCase<ListExpenseByCreditCard.Params, ListExpenseByCreditCard.Result>
{
  constructor(
    private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
    private readonly mountDate: MountDate,
    private readonly addMonths: AddMonths,
    private readonly addDays: AddDays,
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

    const endDayFilter = this.mountDate.mountDate(
      year,
      month,
      creditCard.closingDay,
    );
    const startDayFilter = this.addMonths.addMonths(endDayFilter, -1);

    const expenses =
      await this.findExpenseByCreditCardIdAndDateRangeRepository.findExpenseByCreditCardIdAndDateRange(
        {
          creditCardId,
          startDate: startDayFilter,
          endDate: this.addDays.addDays(endDayFilter, -1),
        },
      );

    return expenses;
  }
}
