import { ChangeExpenseInvoiceDate } from '@/domain/use-cases/change-expense-invoice-date';
import { UseCase } from '@/domain/use-cases/use-case';
import { ExpenseNotFoundError } from '@/domain/errors/expense-not-found-error';
import { YouAreNotAllowedToChangeThisResourceError } from '@/domain/errors/you-no-have-permission-error';

import { ChangeExpenseInvoiceDateValidator } from '../protocols/validators/change-expense-invoice-date-validator';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { FindExpenseByIdRepository } from '../protocols/database/find-expense-by-id-repository';
import { UpdateExpenseRepository } from '../protocols/database/update-expense-repository';

export class ChangeExpenseInvoiceDateUseCase
  implements
    UseCase<ChangeExpenseInvoiceDate.Params, ChangeExpenseInvoiceDate.Result>
{
  constructor(
    private readonly changeExpenseInvoiceDateValidator: ChangeExpenseInvoiceDateValidator,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly findExpenseByIdRepository: FindExpenseByIdRepository,
    private readonly updateExpenseRepository: UpdateExpenseRepository,
  ) {}

  async execute(
    params: ChangeExpenseInvoiceDate.Params,
  ): Promise<ChangeExpenseInvoiceDate.Result> {
    const { id, increaseInvoiceMonth } =
      this.changeExpenseInvoiceDateValidator.validate(params);

    const expense = await this.findExpenseByIdRepository.findById({ id });

    if (!expense) {
      throw new ExpenseNotFoundError();
    }

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
