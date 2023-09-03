import { SchedulerTaskAdapter } from '@/infra/scheduler/scheduler-task-adapter';

import { makeCreateFixedExpenseUseCase } from '../factories/use-cases/make-create-fixed-expenses-use-case';

SchedulerTaskAdapter.schedule(
  makeCreateFixedExpenseUseCase(),
  '* * 2 * *',
  'create-fixed-expenses',
);
