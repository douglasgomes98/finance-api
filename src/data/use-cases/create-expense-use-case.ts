import { CreateExpense } from '@/domain/use-cases/create-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCategoryByIdUseCase } from './find-category-by-id-use-case';
import { FindCreditCardByIdUseCase } from './find-credit-card-by-id-use-case';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { CreateExpenseRepository } from '../protocols/database/create-expense-repository';
import { AddMonthsProtocol } from '../protocols/date/add-months-protocol';
import { CreateManyExpenseRepository } from '../protocols/database/create-many-expense-repository';
import { CreateIdProtocol } from '../protocols/cryptography/create-id-protocol';
import { StartOfDayProtocol } from '../protocols/date/start-of-day-protocol';
import { CreateExpenseValidator } from '../protocols/validators/create-expense-validator';
import { UpdateCreditCardLimitUseCase } from './update-credit-card-limit-use-case';

export class CreateExpenseUseCase
  implements UseCase<CreateExpense.Params, CreateExpense.Result>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly createExpenseRepository: CreateExpenseRepository,
    private readonly createManyExpenseRepository: CreateManyExpenseRepository,
    private readonly addMonthsProtocol: AddMonthsProtocol,
    private readonly startOfDayProtocol: StartOfDayProtocol,
    private readonly createIdProtocol: CreateIdProtocol,
    private readonly createExpenseValidator: CreateExpenseValidator,
    private readonly updateCreditCardLimitUseCase: UpdateCreditCardLimitUseCase,
  ) {}

  async execute(params: CreateExpense.Params): Promise<CreateExpense.Result> {
    const {
      name,
      value,
      purchaseDate,
      isFixed,
      isIgnored,
      categoryId,
      creditCardId,
      userId,
      installments = 0,
    } = this.createExpenseValidator.validate(params);

    const [category, creditCard, user] = await Promise.all([
      this.findCategoryByIdUseCase.execute({ id: categoryId }),
      this.findCreditCardByIdUseCase.execute({ id: creditCardId }),
      this.findUserByIdUseCase.execute({ id: userId }),
    ]);

    const installmentsIdentifier = await this.createIdProtocol.createId();
    const purchaseDateFormatted =
      this.startOfDayProtocol.startOfDay(purchaseDate);

    if (!isFixed && installments > 1) {
      const installmentValue = Math.floor((value / installments) * 100) / 100;
      const expenses: CreateManyExpenseRepository.Params = Array.from(
        { length: installments },
        (_, index) => {
          const nameWithInstallment = `${name} ${index + 1}/${installments}`;
          const dateWithInstallment = this.startOfDayProtocol.startOfDay(
            this.addMonthsProtocol.addMonths(purchaseDateFormatted, index),
          );

          return {
            name: nameWithInstallment,
            value: installmentValue,
            purchaseDate: purchaseDateFormatted,
            invoiceDate: dateWithInstallment,
            isPaid: false,
            isIgnored,
            isFixed,
            installmentsIdentifier,
            categoryId: category.id,
            creditCardId: creditCard.id,
            userId: user.id,
          };
        },
      );

      const createdExpenses =
        await this.createManyExpenseRepository.createMany(expenses);

      return createdExpenses[0];
    }

    const expense = await this.createExpenseRepository.create({
      name,
      value,
      purchaseDate: purchaseDateFormatted,
      invoiceDate: purchaseDateFormatted,
      isFixed,
      installmentsIdentifier,
      isPaid: false,
      isIgnored,
      categoryId: category.id,
      creditCardId: creditCard.id,
      userId: user.id,
    });

    await this.updateCreditCardLimitUseCase.execute({
      id: creditCard.id,
    });

    return expense;
  }
}
