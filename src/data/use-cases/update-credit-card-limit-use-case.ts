import { UpdateCreditCardLimit } from '@/domain/use-cases/update-credit-card-limit';
import { UseCase } from '@/domain/use-cases/use-case';
import { CreditCardNotFoundError } from '@/domain/errors/credit-card-not-found-error';

import { FindCreditCardByIdRepository } from '../protocols/database/find-credit-card-by-id-repository';
import { UpdateCreditCardLimitValidator } from '../protocols/validators/update-credit-card-limit-validator';
import { FindExpenseByCreditCardRepository } from '../protocols/database/find-expense-by-credit-card';
import { UpdateCreditCardRepository } from '../protocols/database/update-credit-card-repository';
// TODO: verificar despesas fixas
export class UpdateCreditCardLimitUseCase
  implements
    UseCase<UpdateCreditCardLimit.Params, UpdateCreditCardLimit.Result>
{
  constructor(
    private readonly updateCreditCardLimitValidator: UpdateCreditCardLimitValidator,
    private readonly findCreditCardByIdRepository: FindCreditCardByIdRepository,
    private readonly findExpenseByCreditCardRepository: FindExpenseByCreditCardRepository,
    private readonly updateCreditCardRepository: UpdateCreditCardRepository,
  ) {}

  async execute(
    params: UpdateCreditCardLimit.Params,
  ): Promise<UpdateCreditCardLimit.Result> {
    const { id } = this.updateCreditCardLimitValidator.validate(params);

    const creditCard = await this.findCreditCardByIdRepository.findById({ id });

    if (!creditCard) {
      throw new CreditCardNotFoundError();
    }

    const expenses =
      await this.findExpenseByCreditCardRepository.findExpenseByCreditCard({
        creditCardId: id,
      });

    const expenseActives = expenses
      .filter(expense => !expense.isIgnored)
      .filter(expense => !expense.isPaid);
    const newLimitUsed = Number(
      expenseActives
        .reduce((acc, expense) => acc + expense.value, 0)
        .toFixed(2),
    );
    const newLimitAvailable = Number(
      Number(creditCard.limit - newLimitUsed).toFixed(2),
    );
    const newPercentLimitUsed = Math.round(
      (newLimitUsed / creditCard.limit) * 100,
    );

    const creditCardUpdated = await this.updateCreditCardRepository.update({
      id: creditCard.id,
      data: {
        limitUsed: newLimitUsed,
        limitAvailable: newLimitAvailable,
        percentLimitUsed: newPercentLimitUsed,
      },
    });

    return creditCardUpdated;
  }
}
