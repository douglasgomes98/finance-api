import { CreateExpense } from '@/domain/use-cases/create-expense';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCategoryByIdUseCase } from './find-category-by-id';
import { FindCreditCardByIdUseCase } from './find-credit-card-by-id';
import { FindUserByIdUseCase } from './find-user-by-id';
import { CreateExpenseRepository } from '../protocols/database/create-expense-repository';
import { AddMonths } from '../protocols/date/add-months';
import { CreateManyExpenseRepository } from '../protocols/database/create-many-expense-repository';
import { CreateId } from '../protocols/cryptography/create-id';
import { StartOfDay } from '../protocols/date/start-of-day';

export class CreateExpenseUseCase
  implements UseCase<CreateExpense.Params, CreateExpense.Result>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly createExpenseRepository: CreateExpenseRepository,
    private readonly createManyExpenseRepository: CreateManyExpenseRepository,
    private readonly addMonths: AddMonths,
    private readonly startOfDay: StartOfDay,
    private readonly createId: CreateId,
  ) {}

  async execute({
    name,
    value,
    purchaseDate,
    isFixed,
    categoryId,
    creditCardId,
    userId,
    installments = 0,
  }: CreateExpense.Params): Promise<CreateExpense.Result> {
    const [category, creditCard, user] = await Promise.all([
      this.findCategoryByIdUseCase.execute({ id: categoryId }),
      this.findCreditCardByIdUseCase.execute({ id: creditCardId }),
      this.findUserByIdUseCase.execute({ id: userId }),
    ]);

    const installmentsIdentifier = await this.createId.createId();
    const purchaseDateFormatted = this.startOfDay.startOfDay(purchaseDate);

    if (!isFixed && installments > 1) {
      const installmentValue = Math.floor((value / installments) * 100) / 100;
      const expenses: CreateManyExpenseRepository.Params = Array.from(
        { length: installments },
        (_, index) => {
          const nameWithInstallment = `${name} ${index + 1}/${installments}`;
          const dateWithInstallment = this.startOfDay.startOfDay(
            this.addMonths.addMonths(purchaseDateFormatted, index),
          );

          return {
            name: nameWithInstallment,
            value: installmentValue,
            purchaseDate: purchaseDateFormatted,
            invoiceDate: dateWithInstallment,
            isPaid: false,
            isIgnored: false,
            isFixed,
            installmentsIdentifier,
            categoryId: category.id,
            creditCardId: creditCard.id,
            userId: user.id,
          };
        },
      );

      const createdExpenses = await this.createManyExpenseRepository.createMany(
        expenses,
      );

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
      isIgnored: false,
      categoryId: category.id,
      creditCardId: creditCard.id,
      userId: user.id,
    });

    return expense;
  }
}
