import { ICalendarStrategy } from './ICalendarStrategy';

export class CalendarContext {
  private calendarStrategy: ICalendarStrategy;

  constructor(calendarStrategy: ICalendarStrategy) {
    this.calendarStrategy = calendarStrategy;
  }
}
