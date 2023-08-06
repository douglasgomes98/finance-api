import { add, startOfDay } from 'date-fns';

import { AddDaysProtocol } from '@/data/protocols/date/add-days-protocol';
import { AddMonthsProtocol } from '@/data/protocols/date/add-months-protocol';
import { MountDateProtocol } from '@/data/protocols/date/mount-date-protocol';
import { StartOfDayProtocol } from '@/data/protocols/date/start-of-day-protocol';

export class DateServiceAdapter
  implements
    AddMonthsProtocol,
    StartOfDayProtocol,
    MountDateProtocol,
    AddDaysProtocol
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
