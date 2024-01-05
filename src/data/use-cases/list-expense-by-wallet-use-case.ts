import { ListExpense } from '@/domain/use-cases/list-expense';
import { UseCase } from '@/domain/use-cases/use-case';
import { ListExpenseByWallet } from '@/domain/use-cases/list-expense-by-wallet';

import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { ListExpenseByWalletValidator } from '../protocols/validators/list-expense-by-wallet-validator';
import { EndOfDayProtocol } from '../protocols/date/end-of-day-protocol';
import { StartOfDayProtocol } from '../protocols/date/start-of-day-protocol';
import { MountDateProtocol } from '../protocols/date/mount-date-protocol';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { FindExpenseByWalletDateRangeRepository } from '../protocols/database/find-expense-by-walltet-date-range-repository';
import { AddDaysProtocol } from '../protocols/date/add-days-protocol';
// TODO: adicionar dia de fechamento da carteira
const CLOSE_DAY = 10;
export class ListExpenseByWalletUseCase
  implements UseCase<ListExpenseByWallet.Params, ListExpenseByWallet.Result>
{
  constructor(
    private readonly listExpenseByWalletValidator: ListExpenseByWalletValidator,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly mountDateProtocol: MountDateProtocol,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly findExpenseByWalletDateRangeRepository: FindExpenseByWalletDateRangeRepository,
    private readonly endOfDayProtocol: EndOfDayProtocol,
    private readonly startOfDayProtocol: StartOfDayProtocol,
    private readonly addDaysProtocol: AddDaysProtocol,
  ) {}

  async execute(params: ListExpense.Params): Promise<ListExpense.Result> {
    const { month, year, userId } =
      this.listExpenseByWalletValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const endDayFilter = this.mountDateProtocol.mountDate(
      year,
      month,
      CLOSE_DAY,
    );
    const startDayFilter = this.addMonthsProtocol.addMonths(endDayFilter, -1);

    const expenses =
      await this.findExpenseByWalletDateRangeRepository.findExpenseByWalletDateRange(
        {
          userId: user.id,
          startDate: this.startOfDayProtocol.startOfDay(startDayFilter),
          endDate: this.endOfDayProtocol.endOfDay(
            this.addDaysProtocol.addDays(endDayFilter, -1),
          ),
        },
      );

    return {
      expenses,
    };
  }
}
