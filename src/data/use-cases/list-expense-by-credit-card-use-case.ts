import { ListExpenseByCreditCard } from '@/domain/use-cases/list-expense-by-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindExpenseByCreditCardIdAndDateRangeRepository } from '../protocols/database/find-expense-by-credit-card-id-and-date-range-repository';
import { AddDaysProtocol } from '../protocols/date/add-days-protocol';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { MountDateProtocol } from '../protocols/date/mount-date-protocol';
import { FindCreditCardByIdUseCase } from './find-credit-card-by-id-use-case';
import { ListExpenseByCreditCardValidator } from '../protocols/validators/list-expense-by-credit-card-validator';
import { EndOfDayProtocol } from '../protocols/date/end-of-day-protocol';
import { StartOfDayProtocol } from '../protocols/date/start-of-day-protocol';

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
    private readonly listExpenseByCreditCardValidator: ListExpenseByCreditCardValidator,
    private readonly endOfDayProtocol: EndOfDayProtocol,
    private readonly startOfDayProtocol: StartOfDayProtocol,
  ) {}

  async execute(
    params: ListExpenseByCreditCard.Params,
  ): Promise<ListExpenseByCreditCard.Result> {
    const { creditCardId, month, year } =
      this.listExpenseByCreditCardValidator.validate(params);

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
          startDate: this.startOfDayProtocol.startOfDay(startDayFilter),
          endDate: this.endOfDayProtocol.endOfDay(
            this.addDaysProtocol.addDays(endDayFilter, -1),
          ),
        },
      );

    const amount = Number(
      expenses
        .filter(expense => !expense.isIgnored)
        .reduce((acc, expense) => acc + expense.value, 0)
        .toFixed(2),
    );

    return {
      expenses,
      amount,
    };
  }
}
