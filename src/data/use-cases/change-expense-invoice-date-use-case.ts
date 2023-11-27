import { YouAreNotAllowedToChangeThisResourceError } from '@/domain/errors/you-no-have-permission-error';
import { ChangeExpenseInvoiceDate } from '@/domain/use-cases/change-expense-invoice-date';
import { UseCase } from '@/domain/use-cases/use-case';

import { UpdateExpenseRepository } from '../protocols/database/update-expense-repository';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { ChangeExpenseInvoiceDateValidator } from '../protocols/validators/change-expense-invoice-date-validator';
import { FindExpenseByIdUseCase } from './find-expense-by-id-use-case';

export class ChangeExpenseInvoiceDateUseCase
  implements
    UseCase<ChangeExpenseInvoiceDate.Params, ChangeExpenseInvoiceDate.Result>
{
  constructor(
    private readonly changeExpenseInvoiceDateValidator: ChangeExpenseInvoiceDateValidator,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly findExpenseByIdUseCase: FindExpenseByIdUseCase,
    private readonly updateExpenseRepository: UpdateExpenseRepository,
  ) {}

  async execute(
    params: ChangeExpenseInvoiceDate.Params,
  ): Promise<ChangeExpenseInvoiceDate.Result> {
    const { id, increaseInvoiceMonth, userId } =
      this.changeExpenseInvoiceDateValidator.validate(params);

    const expense = await this.findExpenseByIdUseCase.execute({ id, userId });

    if (expense.isPaid) {
      throw new YouAreNotAllowedToChangeThisResourceError();
    }

    const newInvoiceDate = this.addMonthsProtocol.addMonths(
      expense.invoiceDate,
      increaseInvoiceMonth,
    );

    const updatedExpense = await this.updateExpenseRepository.update({
      id,
      data: { invoiceDate: newInvoiceDate },
    });

    return updatedExpense;
  }
}
