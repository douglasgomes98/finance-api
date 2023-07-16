import { CreditCardModel } from '@/entities/credit-card-model';
import { CreditCardRepository } from '@/repositories/credit-card-repository';

import { UseCase } from '../use-case';
import { FindUserByIdUseCase } from '../user/find-user-by-id';

type ListCreditCardUseCaseRequest = {
  userId: string;
};

type ListCreditCardUseCaseResponse = {
  data: CreditCardModel[];
};

export class ListCreditCardUseCase
  implements
    UseCase<ListCreditCardUseCaseRequest, ListCreditCardUseCaseResponse>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly creditCardRepository: CreditCardRepository,
  ) {}

  async execute({
    userId,
  }: ListCreditCardUseCaseRequest): Promise<ListCreditCardUseCaseResponse> {
    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const creditCards = await this.creditCardRepository.findByUserId(user.id);

    return { data: creditCards };
  }
}
