import { CreateCreditCard } from '@/domain/use-cases/create-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';
import { CreditCardAlreadyExistsError } from '@/domain/errors/credit-card-already-exists-error';

import { FindUserByIdUseCase } from './find-user-by-id';
import { FindCreditCardByUserAndNameRepository } from '../protocols/database/find-credit-card-by-user-and-name';
import { CreateCreditCardRepository } from '../protocols/database/create-credit-card';

export class CreateCreditCardUseCase
  implements UseCase<CreateCreditCard.Params, CreateCreditCard.Result>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findCreditCardByUserAndNameRepository: FindCreditCardByUserAndNameRepository,
    private readonly createCreditCardRepository: CreateCreditCardRepository,
  ) {}

  async execute({
    name,
    color,
    limit,
    dueDay,
    closingDay,
    userId,
  }: CreateCreditCard.Params): Promise<CreateCreditCard.Result> {
    const user = await this.findUserByIdUseCase.execute({
      id: userId,
    });

    const creditCardAlreadyExists =
      await this.findCreditCardByUserAndNameRepository.findByUserAndName({
        userId,
        name,
      });

    if (creditCardAlreadyExists) {
      throw new CreditCardAlreadyExistsError();
    }

    const creditCard = await this.createCreditCardRepository.create({
      name,
      color,
      limit,
      dueDay,
      closingDay,
      userId: user.id,
    });

    return creditCard;
  }
}
