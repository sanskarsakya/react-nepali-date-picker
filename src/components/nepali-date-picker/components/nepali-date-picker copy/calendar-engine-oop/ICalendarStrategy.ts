import { IDayInfo } from './domain';

export interface ICalendarStrategy {
  get_primary_day_info(
    weekNum: any,
    weekDayNum: any,
    calendar_date: any,
    input_date?: any,
  ): IDayInfo;

  get_secondary_day_info(
    weekNum: any,
    weekDayNum: any,
    calendar_date: any,
    input_date?: any,
  ): IDayInfo;

  get_next_decade_date(date: string): string;

  get_next_year_date(date: string): string;

  get_next_month_date(date: string): string;

  get_previous_decade_date(date: string): string;

  get_previous_year_date(date: string): string;

  get_previous_month_date(date: string): string;

  get_first_day_of_the_month(date: Date): number;

  get_total_days_in_month(date: Date): number;

  get_weeks_in_month(date: string): number;

  is_date_valid(date: string): boolean;

  is_date_in_range(
    dateToValidate: string,
    disableDateBefore: string,
    disableDateAfter: string,
  ): boolean;

  is_today(date: string): boolean;

  get_total_number_of_days_in_previous_month(date: string): number;

  is_date_valid(date: string): boolean;

  validate_date_in_range(date: string): boolean;
}
