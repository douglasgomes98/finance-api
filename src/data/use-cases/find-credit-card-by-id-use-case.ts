import { FindCreditCardById } from '@/domain/use-cases/find-credit-card-by-id';
import { UseCase } from '@/domain/use-cases/use-case';
import { CreditCardNotFoundError } from '@/domain/errors/credit-card-not-found-error';

import { FindCreditCardByIdRepository } from '../protocols/database/find-credit-card-by-id-repository';
import { FindCreditCardByIdValidator } from '../protocols/validators/find-credit-card-by-id-validator';

export class FindCreditCardByIdUseCase
  implements UseCase<FindCreditCardById.Params, FindCreditCardById.Result>
{
  constructor(
    private readonly findCreditCardByIdRepository: FindCreditCardByIdRepository,
    private readonly findCreditCardByIdValidator: FindCreditCardByIdValidator,
  ) {}

  async execute(
    params: FindCreditCardById.Params,
  ): Promise<FindCreditCardById.Result> {
    const { id, userId } = this.findCreditCardByIdValidator.validate(params);

    const creditCard = await this.findCreditCardByIdRepository.findById({ id });

    if (!creditCard) {
      throw new CreditCardNotFoundError();
    }

    if (userId && creditCard.userId !== userId) {
      throw new CreditCardNotFoundError();
    }

    return creditCard;
  }
}
