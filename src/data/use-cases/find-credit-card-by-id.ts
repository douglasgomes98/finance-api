import { FindCreditCardById } from '@/domain/use-cases/find-credit-card-by-id';
import { UseCase } from '@/domain/use-cases/use-case';
import { CreditCardNotFoundError } from '@/domain/errors/credit-card-not-found-error';

import { FindCreditCardByIdRepository } from '../protocols/database/find-credit-card-by-id';

export class FindCreditCardByIdUseCase
  implements UseCase<FindCreditCardById.Params, FindCreditCardById.Result>
{
  constructor(
    private readonly findCreditCardByIdRepository: FindCreditCardByIdRepository,
  ) {}

  async execute({
    id,
  }: FindCreditCardById.Params): Promise<FindCreditCardById.Result> {
    const creditCard = await this.findCreditCardByIdRepository.findById({ id });

    if (!creditCard) {
      throw new CreditCardNotFoundError();
    }

    return creditCard;
  }
}
