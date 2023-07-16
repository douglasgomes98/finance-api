import { ExpenseModel } from '@/entities/expense-model';
import {
  CreateExpenseRepositoryDTO,
  ExpenseRepository,
} from '@/repositories/expense-repository';
import { DateService } from '@/services/date-service';

import { UseCase } from '../use-case';
import { FindUserByIdUseCase } from '../user/find-user-by-id';
import { FindCategoryByIdUseCase } from '../category/find-category-by-id';
import { FindCreditCardByIdUseCase } from '../credit-card/find-credit-card-by-id';

type CreateExpenseUseCaseRequest = Omit<ExpenseModel, 'id' | 'paid'> & {
  installments: number;
};

type CreateExpenseUseCaseResponse = ExpenseModel;

export class CreateExpenseUseCase
  implements UseCase<CreateExpenseUseCaseRequest, CreateExpenseUseCaseResponse>
{
  constructor(
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly expenseRepository: ExpenseRepository,
    private readonly dateService: DateService,
  ) {}

  async execute({
    name,
    value,
    date,
    installments,
    categoryId,
    creditCardId,
    userId,
  }: CreateExpenseUseCaseRequest): Promise<CreateExpenseUseCaseResponse> {
    const [category, creditCard, user] = await Promise.all([
      this.findCategoryByIdUseCase.execute({ id: categoryId }),
      this.findCreditCardByIdUseCase.execute({ id: creditCardId }),
      this.findUserByIdUseCase.execute({ id: userId }),
    ]);

    if (installments > 1) {
      const expenses: CreateExpenseRepositoryDTO[] = Array.from(
        { length: installments },
        (_, index) => {
          const nameWithInstallment = `${name} ${index + 1}/${installments}`;
          const dateWithInstallment = this.dateService.addMonths(date, index);

          return {
            name: nameWithInstallment,
            value,
            date: dateWithInstallment,
            paid: false,
            categoryId: category.id,
            creditCardId: creditCard.id,
            userId: user.id,
          };
        },
      );

      const createdExpenses = await this.expenseRepository.createMany(expenses);

      return createdExpenses[0];
    }

    const expense = await this.expenseRepository.create({
      name,
      value,
      date,
      paid: false,
      categoryId: category.id,
      creditCardId: creditCard.id,
      userId: user.id,
    });

    return expense;
  }
}
