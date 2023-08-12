import { CreditCardAlreadyExistsError } from '@/domain/errors/credit-card-already-exists-error';
import { CreateCreditCard } from '@/domain/use-cases/create-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';

import { CreateCreditCardRepository } from '../protocols/database/create-credit-card-repository';
import { FindCreditCardByUserAndNameRepository } from '../protocols/database/find-credit-card-by-user-and-name-repository';
import { FindBankByIdUseCase } from './find-bank-by-id-use-case';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';

export class CreateCreditCardUseCase
  implements UseCase<CreateCreditCard.Params, CreateCreditCard.Result>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findCreditCardByUserAndNameRepository: FindCreditCardByUserAndNameRepository,
    private readonly createCreditCardRepository: CreateCreditCardRepository,
    private readonly findBankByIdUseCase: FindBankByIdUseCase,
  ) {}

  async execute({
    name,
    dueDay,
    closingDay,
    limit,
    userId,
    bankId,
  }: CreateCreditCard.Params): Promise<CreateCreditCard.Result> {
    const [user, bank] = await Promise.all([
      this.findUserByIdUseCase.execute({
        id: userId,
      }),
      this.findBankByIdUseCase.execute({
        id: bankId,
      }),
    ]);

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
      dueDay,
      closingDay,
      limit,
      userId: user.id,
      bankId: bank.id,
      limitAvailable: limit,
      limitUsed: 0,
      percentLimitUsed: 0,
    });

    return creditCard;
  }
}