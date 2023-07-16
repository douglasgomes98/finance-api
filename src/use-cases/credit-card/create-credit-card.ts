import { CreditCardModel } from '@/entities/credit-card-model';
import { CreditCardRepository } from '@/repositories/credit-card-repository';

import { UseCase } from '../use-case';
import { FindUserByIdUseCase } from '../user/find-user-by-id';
import { CreditCardAlreadyExistsError } from './errors/credit-card-already-exists-error';

type CreateCreditCardUseCaseRequest = Omit<CreditCardModel, 'id'>;

type CreateCreditCardUseCaseResponse = CreditCardModel;

export class CreateCreditCardUseCase
  implements
    UseCase<CreateCreditCardUseCaseRequest, CreateCreditCardUseCaseResponse>
{
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly creditCardRepository: CreditCardRepository,
  ) {}

  async execute({
    name,
    limit,
    dueDay,
    closingDay,
    userId,
  }: CreateCreditCardUseCaseRequest): Promise<CreateCreditCardUseCaseResponse> {
    const user = await this.findUserByIdUseCase.execute({
      id: userId,
    });

    const creditCardAlreadyExists =
      await this.creditCardRepository.findByUserAndName({
        userId,
        name,
      });

    if (creditCardAlreadyExists) {
      throw new CreditCardAlreadyExistsError();
    }

    const creditCard = await this.creditCardRepository.create({
      name,
      limit,
      dueDay,
      closingDay,
      userId: user.id,
    });

    return creditCard;
  }
}
