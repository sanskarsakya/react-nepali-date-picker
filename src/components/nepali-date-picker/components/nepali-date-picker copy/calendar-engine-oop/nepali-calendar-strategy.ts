import { ICalendarStrategy } from './ICalendarStrategy';
import { IDayInfo } from './domain';

export class NepaliCalendarStrategy implements ICalendarStrategy {
  get_primary_day_info(
    weekNum: any,
    weekDayNum: any,
    calendar_date: any,
    input_date?: any,
  ): IDayInfo {
    throw new Error('Method not implemented.');
  }

  get_first_day_of_the_month(date: Date): number {
    throw new Error('Method not implemented.');
  }

  get_total_days_in_month(date: Date): number {
    throw new Error('Method not implemented.');
  }

  get_next_decade_date(date: string): string {
    throw new Error('Method not implemented.');
  }

  get_next_month_date(date: string): string {
    throw new Error('Method not implemented.');
  }

  get_next_year_date(date: string): string {
    throw new Error('Method not implemented.');
  }

  get_previous_decade_date(date: string): string {
    throw new Error('Method not implemented.');
  }

  get_previous_month_date(date: string): string {
    throw new Error('Method not implemented.');
  }

  get_previous_year_date(date: string): string {
    throw new Error('Method not implemented.');
  }

  get_weeks_in_month(date: string): number {
    throw new Error('Method not implemented.');
  }

  is_date_valid(date: string): boolean {
    throw new Error('Method not implemented.');
  }

  is_date_in_range(
    dateToValidate: string,
    disableDateBefore: string,
    disableDateAfter: string,
  ): boolean {
    throw new Error('Method not implemented.');
  }
}
