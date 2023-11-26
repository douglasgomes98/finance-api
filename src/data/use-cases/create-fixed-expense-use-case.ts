import { CreateFixedExpense } from '@/domain/use-cases/create-fixed-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { EndOfDayProtocol } from '../protocols/date/end-of-day-protocol';
import { StartOfDayProtocol } from '../protocols/date/start-of-day-protocol';
import { FindExpenseByDateRangeRepository } from '../protocols/database/find-expense-by-date-range-repository';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { CreateExpenseRepository } from '../protocols/database/create-expense-repository';

export class CreateFixedExpenseUseCase
  implements UseCase<CreateFixedExpense.Params, CreateFixedExpense.Result>
{
  constructor(
    private readonly endOfDayProtocol: EndOfDayProtocol,
    private readonly startOfDayProtocol: StartOfDayProtocol,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly findExpenseByDateRangeRepository: FindExpenseByDateRangeRepository,
    private readonly createExpenseRepository: CreateExpenseRepository,
  ) {}

  async execute(): Promise<CreateFixedExpense.Result> {
    const today = new Date();
    const dateObserved = this.addMonthsProtocol.addMonths(today, -1);
    const startDayFilter = this.startOfDayProtocol.startOfDay(dateObserved);
    const endDayFilter = this.endOfDayProtocol.endOfDay(dateObserved);

    const expenses =
      await this.findExpenseByDateRangeRepository.findByDateRange({
        startDate: startDayFilter,
        endDate: endDayFilter,
        isFixed: true,
      });

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
