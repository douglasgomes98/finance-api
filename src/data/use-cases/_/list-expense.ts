// import { ListExpense } from '@/domain/use-cases/list-expense';
// import { UseCase } from '@/domain/use-cases/use-case';

// import { DateService } from '../protocols/date/date-service';
// import { ExpenseRepository } from '../protocols/database/expense-repository';

// export class ListExpenseUseCase
//   implements UseCase<ListExpense.Params, ListExpense.Result>
// {
//   constructor(
//     private readonly dateService: DateService,
//     private readonly expenseRepository: ExpenseRepository,
//   ) {}

//   async execute({
//     month,
//     year,
//   }: ListExpense.Params): Promise<ListExpense.Result> {
//     const endDayFilter = new Date(year, month - 1, 1);
//     const startDayFilter = this.dateService.addMonths(endDayFilter, -1);

//     const expenses = await this.expenseRepository.findByDateRange({
//       startDate: startDayFilter,
//       endDate: endDayFilter,
//     });

//     return { data: expenses };
//   }
// }
export {};
