import { SchedulerTaskAdapter } from '@/infra/scheduler/scheduler-task-adapter';

import { makeCreateFixedExpenseUseCase } from '../factories/use-cases/make-create-fixed-expenses-use-case';

SchedulerTaskAdapter.schedule(
  makeCreateFixedExpenseUseCase(),
  '0 1 * * *', // Every day at 1:00 AM
  'create-fixed-expenses',
);
