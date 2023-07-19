// import { CreateCreditCard } from '@/domain/use-cases/create-credit-card';
// import { UseCase } from '@/domain/use-cases/use-case';
// import { CreditCardAlreadyExistsError } from '@/domain/errors/credit-card-already-exists-error';

// import { FindUserByIdUseCase } from './find-user-by-id';
// import { CreditCardRepository } from '../protocols/database/credit-card-repository';

// export class CreateCreditCardUseCase
//   implements UseCase<CreateCreditCard.Params, CreateCreditCard.Result>
// {
//   constructor(
//     private readonly findUserByIdUseCase: FindUserByIdUseCase,
//     private readonly creditCardRepository: CreditCardRepository,
//   ) {}

//   async execute({
//     name,
//     limit,
//     dueDay,
//     closingDay,
//     userId,
//   }: CreateCreditCard.Params): Promise<CreateCreditCard.Result> {
//     const user = await this.findUserByIdUseCase.execute({
//       id: userId,
//     });

//     const creditCardAlreadyExists =
//       await this.creditCardRepository.findByUserAndName({
//         userId,
//         name,
//       });

//     if (creditCardAlreadyExists) {
//       throw new CreditCardAlreadyExistsError();
//     }

//     const creditCard = await this.creditCardRepository.create({
//       name,
//       limit,
//       dueDay,
//       closingDay,
//       userId: user.id,
//     });

//     return creditCard;
//   }
// }
export {};
