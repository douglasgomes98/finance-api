import { CreateFixedExpense } from '@/domain/use-cases/create-fixed-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { CreateExpenseRepository } from '../protocols/database/create-expense-repository';
import { FindExpenseByWalletDateRangeRepository } from '../protocols/database/find-expense-by-walltet-date-range-repository';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { EndOfDayProtocol } from '../protocols/date/end-of-day-protocol';
import { StartOfDayProtocol } from '../protocols/date/start-of-day-protocol';

export class CreateFixedWalletExpenseUseCase
  implements UseCase<CreateFixedExpense.Params, CreateFixedExpense.Result>
{
  constructor(
    private readonly endOfDayProtocol: EndOfDayProtocol,
    private readonly startOfDayProtocol: StartOfDayProtocol,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly findExpenseByWalletDateRangeRepository: FindExpenseByWalletDateRangeRepository,
    private readonly createExpenseRepository: CreateExpenseRepository,
  ) {}

  async execute(): Promise<CreateFixedExpense.Result> {
    const date = this.addMonthsProtocol.addMonths(new Date(), -1);

    const expenses =
      await this.findExpenseByWalletDateRangeRepository.findExpenseByWalletDateRange(
        {
          startDate: this.startOfDayProtocol.startOfDay(date),
          endDate: this.endOfDayProtocol.endOfDay(date),
          isFixed: true,
        },
      );

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
