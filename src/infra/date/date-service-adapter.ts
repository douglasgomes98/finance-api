import { add, startOfDay } from 'date-fns';

import { AddMonths } from '@/data/protocols/date/add-months';
import { StartOfDay } from '@/data/protocols/date/start-of-day';

export class DateServiceAdapter implements AddMonths, StartOfDay {
  addMonths(date: Date, months: number): Date {
    return add(date, { months });
  }

  startOfDay(date: Date): Date {
    return startOfDay(date);
  }
}
