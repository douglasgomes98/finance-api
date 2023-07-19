// import { ListExpenseByCreditCard } from '@/domain/use-cases/list-expense-by-credit-card';
// import { UseCase } from '@/domain/use-cases/use-case';

// import { FindCreditCardByIdUseCase } from './find-credit-card-by-id';
// import { DateService } from '../protocols/date/date-service';
// import { ExpenseRepository } from '../protocols/database/expense-repository';

// export class ListExpenseByCreditCardUseCase
//   implements
//     UseCase<ListExpenseByCreditCard.Params, ListExpenseByCreditCard.Result>
// {
//   constructor(
//     private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
//     private readonly dateService: DateService,
//     private readonly expenseRepository: ExpenseRepository,
//   ) {}

//   async execute({
//     creditCardId,
//     month,
//     year,
//   }: ListExpenseByCreditCard.Params): Promise<ListExpenseByCreditCard.Result> {
//     const creditCard = await this.findCreditCardByIdUseCase.execute({
//       id: creditCardId,
//     });

//     const endDayFilter = new Date(year, month - 1, creditCard.dueDay);
//     const startDayFilter = this.dateService.addMonths(endDayFilter, -1);

//     const expenses =
//       await this.expenseRepository.findByCreditCardIdAndDateRange({
//         creditCardId,
//         startDate: startDayFilter,
//         endDate: endDayFilter,
//       });

//     return { data: expenses };
//   }
// }
export {};
