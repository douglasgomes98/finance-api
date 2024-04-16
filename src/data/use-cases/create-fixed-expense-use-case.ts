import { CreateFixedExpense } from '@/domain/use-cases/create-fixed-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { CreateExpenseRepository } from '../protocols/database/create-expense-repository';
import { FindCreditCardClosedByDateRepository } from '../protocols/database/find-credit-card-closed-by-date';
import { FindExpenseByCreditCardIdAndDateRangeRepository } from '../protocols/database/find-expense-by-credit-card-id-and-date-range-repository';
import { AddDaysProtocol } from '../protocols/date/add-days-protocol';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { EndOfDayProtocol } from '../protocols/date/end-of-day-protocol';
import { MountDateProtocol } from '../protocols/date/mount-date-protocol';
import { StartOfDayProtocol } from '../protocols/date/start-of-day-protocol';

export class CreateFixedExpenseUseCase
  implements UseCase<CreateFixedExpense.Params, CreateFixedExpense.Result>
{
  constructor(
    private readonly endOfDayProtocol: EndOfDayProtocol,
    private readonly startOfDayProtocol: StartOfDayProtocol,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly addDaysProtocol: AddDaysProtocol,
    private readonly mountDateProtocol: MountDateProtocol,
    private readonly findCreditCardClosedByDateRepository: FindCreditCardClosedByDateRepository,
    private readonly findExpenseByCreditCardIdAndDateRangeRepository: FindExpenseByCreditCardIdAndDateRangeRepository,
    private readonly createExpenseRepository: CreateExpenseRepository,
  ) {}

  async execute(): Promise<CreateFixedExpense.Result> {
    const date = new Date();
    const previousMonth = date.getMonth() + 1;
    const year = date.getFullYear();

    const creditCards =
      await this.findCreditCardClosedByDateRepository.findClosedByDate({
        date,
      });

    const expensesByCreditCard = await Promise.all(
      creditCards.map(creditCard => {
        const endDayFilter = this.mountDateProtocol.mountDate(
          year,
          previousMonth,
          creditCard.closingDay,
        );
        const startDayFilter = this.addMonthsProtocol.addMonths(
          endDayFilter,
          -1,
        );

        return this.findExpenseByCreditCardIdAndDateRangeRepository.findByCreditCardIdAndDateRange(
          {
            creditCardId: creditCard.id,
            startDate: this.startOfDayProtocol.startOfDay(startDayFilter),
            endDate: this.endOfDayProtocol.endOfDay(
              this.addDaysProtocol.addDays(endDayFilter, -1),
            ),
            isFixed: true,
          },
        );
      }),
    );
    const expenses = expensesByCreditCard.flat();

    await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ...expenses.map(({ id, ...expense }) =>
        this.createExpenseRepository.create({
          ...expense,
          purchaseDate: this.addMonthsProtocol.addMonths(
            expense.purchaseDate,
            1,
          ),
          invoiceDate: this.addMonthsProtocol.addMonths(expense.invoiceDate, 1),
        }),
      ),
    ]);
  }
}
