import { DeleteCreditCard } from '@/domain/use-cases/delete-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';

import { FindCreditCardByIdUseCase } from './find-credit-card-by-id';
import { DeleteCreditCardRepository } from '../protocols/database/delete-credit-card';

export class DeleteCreditCardUseCase
  implements UseCase<DeleteCreditCard.Params, DeleteCreditCard.Result>
{
  constructor(
    private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
    private readonly deleteCreditCardRepository: DeleteCreditCardRepository,
  ) {}

  async execute({
    id,
  }: DeleteCreditCard.Params): Promise<DeleteCreditCard.Result> {
    const creditCard = await this.findCreditCardByIdUseCase.execute({ id });

    await this.deleteCreditCardRepository.delete({ id: creditCard.id });
  }
}
