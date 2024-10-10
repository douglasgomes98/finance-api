import { SchedulerTaskAdapter } from '@/infra/scheduler/scheduler-task-adapter';

import { makeCreateFixedCreditCardExpenseUseCase } from '../factories/use-cases/make-create-fixed-credit-card-expenses-use-case';
import { makeCreateFixedWalletExpenseUseCase } from '../factories/use-cases/make-create-fixed-wallet-expenses-use-case';

SchedulerTaskAdapter.schedule(
  makeCreateFixedCreditCardExpenseUseCase(),
  '0 1 * * *', // Every day at 1:00 AM
  'create-fixed-credit-card-expense',
);

SchedulerTaskAdapter.schedule(
  makeCreateFixedWalletExpenseUseCase(),
  '0 1 * * *', // Every day at 1:00 AM
  'create-fixed-wallet-expense',
);
