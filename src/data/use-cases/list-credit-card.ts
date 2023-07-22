import { ListCreditCard } from '@/domain/use-cases/list-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindUserByIdUseCase } from './find-user-by-id';
import { FindCreditCardByUserRepository } from '../protocols/database/find-credit-card-by-user';

export class ListCreditCardUseCase
  implements UseCase<ListCreditCard.Params, ListCreditCard.Result>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findCreditCardByUserRepository: FindCreditCardByUserRepository,
  ) {}

  async execute({
    userId,
  }: ListCreditCard.Params): Promise<ListCreditCard.Result> {
    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const creditCards = await this.findCreditCardByUserRepository.findByUser({
      id: user.id,
    });

    return creditCards;
  }
}
