import { DeleteCreditCard } from '@/domain/use-cases/delete-credit-card';
import { UseCase } from '@/domain/use-cases/use-case';
import { YouAreNotAllowedToChangeThisResourceError } from '@/domain/errors/you-no-have-permission-error';

import { FindCreditCardByIdUseCase } from './find-credit-card-by-id-use-case';
import { DeleteCreditCardRepository } from '../protocols/database/delete-credit-card-repository';
import { FindUserByIdUseCase } from './find-user-by-id-use-case';
import { DeleteAllExpenseByCreditCardRepository } from '../protocols/database/delete-all-expense-by-credit-card';

export class DeleteCreditCardUseCase
  implements UseCase<DeleteCreditCard.Params, DeleteCreditCard.Result>
{
  constructor(
    private readonly findCreditCardByIdUseCase: FindCreditCardByIdUseCase,
    private readonly deleteCreditCardRepository: DeleteCreditCardRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly deleteAllExpenseByCreditCardRepository: DeleteAllExpenseByCreditCardRepository,
  ) {}

  async execute({
    creditCardId,
    userId,
  }: DeleteCreditCard.Params): Promise<DeleteCreditCard.Result> {
    const [user, creditCard] = await Promise.all([
      this.findUserByIdUseCase.execute({ id: userId }),
      this.findCreditCardByIdUseCase.execute({ id: creditCardId }),
    ]);

    if (creditCard.userId !== user.id) {
      throw new YouAreNotAllowedToChangeThisResourceError();
    }

    await Promise.all([
      this.deleteCreditCardRepository.delete({ id: creditCard.id }),
      this.deleteAllExpenseByCreditCardRepository.deleteAllByCreditCard({
        creditCardId: creditCard.id,
      }),
    ]);
  }
}
