// import { CreateExpense } from '@/domain/use-cases/create-expense';
// import { UseCase } from '@/domain/use-cases/use-case';

// import { FindCategoryByIdUseCase } from './find-category-by-id';
// import { FindCreditCardByIdUseCase } from './find-credit-card-by-id';
// import { FindUserByIdUseCase } from './find-user-by-id';
// import {
//   CreateExpenseRepositoryDTO,
//   ExpenseRepository,
// } from '../protocols/database/expense-repository';
// import { DateService } from '../protocols/date/date-service';

// export class CreateExpenseUseCase
//   implements UseCase<CreateExpense.Params, CreateExpense.Result>
// {
//   constructor(
//     private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
//     private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
//     private readonly findUserByIdUseCase: FindUserByIdUseCase,
//     private readonly expenseRepository: ExpenseRepository,
//     private readonly dateService: DateService,
//   ) {}

//   async execute({
//     name,
//     value,
//     date,
//     installments,
//     categoryId,
//     creditCardId,
//     userId,
//   }: CreateExpense.Params): Promise<CreateExpense.Result> {
//     const [category, creditCard, user] = await Promise.all([
//       this.findCategoryByIdUseCase.execute({ id: categoryId }),
//       this.findCreditCardByIdUseCase.execute({ id: creditCardId }),
//       this.findUserByIdUseCase.execute({ id: userId }),
//     ]);

//     if (installments > 1) {
//       const expenses: CreateExpenseRepositoryDTO[] = Array.from(
//         { length: installments },
//         (_, index) => {
//           const nameWithInstallment = `${name} ${index + 1}/${installments}`;
//           const dateWithInstallment = this.dateService.addMonths(date, index);

//           return {
//             name: nameWithInstallment,
//             value,
//             date: dateWithInstallment,
//             paid: false,
//             categoryId: category.id,
//             creditCardId: creditCard.id,
//             userId: user.id,
//           };
//         },
//       );

//       const createdExpenses = await this.expenseRepository.createMany(expenses);

//       return createdExpenses[0];
//     }

//     const expense = await this.expenseRepository.create({
//       name,
//       value,
//       date,
//       paid: false,
//       categoryId: category.id,
//       creditCardId: creditCard.id,
//       userId: user.id,
//     });

//     return expense;
//   }
// }
export {};
