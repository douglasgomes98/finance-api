/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateFixedExpenses } from '@/domain/use-cases/create-fixed-expenses';
import { UseCase } from '@/domain/use-cases/use-case';

import { EndOfDayProtocol } from '../protocols/date/end-of-day-protocol';
import { StartOfDayProtocol } from '../protocols/date/start-of-day-protocol';
import { FindExpenseByDateRangeRepository } from '../protocols/database/find-expense-by-date-range-repository';
import { AddDaysProtocol } from '../protocols/date/add-days-protocol';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { CreateExpenseRepository } from '../protocols/database/create-expense-repository';

export class CreateFixedExpensesUseCase
  implements UseCase<CreateFixedExpenses.Params, CreateFixedExpenses.Result>
{
  constructor(
    private readonly endOfDayProtocol: EndOfDayProtocol,
    private readonly startOfDayProtocol: StartOfDayProtocol,
    private readonly addDaysProtocol: AddDaysProtocol,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly findExpenseByDateRangeRepository: FindExpenseByDateRangeRepository,
    private readonly createExpenseRepository: CreateExpenseRepository,
  ) {}

  async execute(): Promise<CreateFixedExpenses.Result> {
    const today = new Date();
    const dateObserved = this.addMonthsProtocol.addMonths(today, -1);
    const startDayFilter = this.startOfDayProtocol.startOfDay(
      this.addDaysProtocol.addDays(dateObserved, -1),
    );
    const endDayFilter = this.endOfDayProtocol.endOfDay(
      this.addDaysProtocol.addDays(dateObserved, -1),
    );

    const expenses =
      await this.findExpenseByDateRangeRepository.findByDateRange({
        startDate: startDayFilter,
        endDate: endDayFilter,
        isFixed: true,
      });

    await Promise.all([
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
