import { CreditCardRepository } from '@/repositories/credit-card-repository';
import { CreditCardModel } from '@/entities/credit-card-model';

import { UseCase } from '../use-case';
import { CreditCardNotFoundError } from './errors/credit-card-not-found-error';

type FindCreditCardByIdUseCaseRequest = {
  id: string;
};

type FindCreditCardByIdUseCaseResponse = CreditCardModel;

export class FindCreditCardByIdUseCase
  implements
    UseCase<
      FindCreditCardByIdUseCaseRequest,
      FindCreditCardByIdUseCaseResponse
    >
{
  constructor(private readonly creditCardRepository: CreditCardRepository) {}

  async execute({
    id,
  }: FindCreditCardByIdUseCaseRequest): Promise<FindCreditCardByIdUseCaseResponse> {
    const creditCard = await this.creditCardRepository.findById(id);

    if (!creditCard) {
      throw new CreditCardNotFoundError();
    }

    return creditCard;
  }
}
