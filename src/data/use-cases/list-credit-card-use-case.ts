import { ListCreditCard } from '@/domain/use-cases/list-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { FindCreditCardByUserRepository } from '../protocols/database/find-credit-card-by-user-repository';
import { ListCreditCardValidator } from '../protocols/validators/list-credit-card-validator';

export class ListCreditCardUseCase
  implements UseCase<ListCreditCard.Params, ListCreditCard.Result>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findCreditCardByUserRepository: FindCreditCardByUserRepository,
    private readonly listCreditCardValidator: ListCreditCardValidator,
  ) {}

  async execute(params: ListCreditCard.Params): Promise<ListCreditCard.Result> {
    const { userId } = this.listCreditCardValidator.validate(params);

    const user = await this.findUserByIdUseCase.execute({ id: userId });

    const creditCards = await this.findCreditCardByUserRepository.findByUser({
      id: user.id,
    });

    return creditCards;
  }
}
