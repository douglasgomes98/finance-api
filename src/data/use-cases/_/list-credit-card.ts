// import { ListCreditCard } from '@/domain/use-cases/list-credit-card';
// import { UseCase } from '@/domain/use-cases/use-case';

// import { FindUserByIdUseCase } from './find-user-by-id';
// import { CreditCardRepository } from '../protocols/database/credit-card-repository';

// export class ListCreditCardUseCase
//   implements UseCase<ListCreditCard.Params, ListCreditCard.Result>
// {
//   constructor(
//     private readonly findUserByIdUseCase: FindUserByIdUseCase,
//     private readonly creditCardRepository: CreditCardRepository,
//   ) {}

//   async execute({
//     userId,
//   }: ListCreditCard.Params): Promise<ListCreditCard.Result> {
//     const user = await this.findUserByIdUseCase.execute({ id: userId });

//     const creditCards = await this.creditCardRepository.findByUserId(user.id);

//     return creditCards;
//   }
// }
export {};
