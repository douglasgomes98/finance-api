// import { FindCreditCardById } from '@/domain/use-cases/find-credit-card-by-id';
// import { UseCase } from '@/domain/use-cases/use-case';
// import { CreditCardNotFoundError } from '@/domain/errors/credit-card-not-found-error';

// import { CreditCardRepository } from '../protocols/database/credit-card-repository';

// export class FindCreditCardByIdUseCase
//   implements UseCase<FindCreditCardById.Params, FindCreditCardById.Result>
// {
//   constructor(private readonly creditCardRepository: CreditCardRepository) {}

//   async execute({
//     id,
//   }: FindCreditCardById.Params): Promise<FindCreditCardById.Result> {
//     const creditCard = await this.creditCardRepository.findById(id);

//     if (!creditCard) {
//       throw new CreditCardNotFoundError();
//     }

//     return creditCard;
//   }
// }
export {};
