import { add, startOfDay } from 'date-fns';

import { AddDays } from '@/data/protocols/date/add-days';
import { AddMonths } from '@/data/protocols/date/add-months';
import { MountDate } from '@/data/protocols/date/mount-date';
import { StartOfDay } from '@/data/protocols/date/start-of-day';

export class DateServiceAdapter
  implements AddMonths, StartOfDay, MountDate, AddDays
{
  addMonths(date: Date, months: number): Date {
    return add(date, { months });
  }

  startOfDay(date: Date): Date {
    return startOfDay(date);
  }

  mountDate(year: number, month: number, day: number): Date {
    return new Date(year, month - 1, day);
  }

  addDays(date: Date, days: number): Date {
    return add(date, { days });
  }
}
