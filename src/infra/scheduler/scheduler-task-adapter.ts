import cron from 'node-cron';

import { UseCase } from '@/domain/use-cases/use-case';

export class SchedulerTaskAdapter {
  private constructor() {}

  static schedule(
    useCase: UseCase<unknown, unknown>,
    cronExpression: string,
    cronName: string,
  ) {
    const isCronExpressionValid = cron.validate(cronExpression);

    if (!isCronExpressionValid) {
      throw new Error('Invalid cron expression');
    }

    cron.schedule(cronExpression, () => useCase.execute({}), {
      name: cronName,
    });
  }
}
