import { ICalendarStrategy } from './ICalendarStrategy';
import dayjs from 'dayjs';
import { ADToBS } from 'bikram-sambat-js';
import {
  dateFormat,
  DEFAULT_DATE_FORMAT,
  IDayInfo,
  maxADYear,
  minADYear,
} from './domain';
import { utilities } from './utilities';

export class EnglishCalendarStrategy implements ICalendarStrategy {
  get_weeks_in_month(date: string): number {
    const currentDate = new Date(date);

    const currentMonth: number = currentDate.getMonth();
    const startOfMonth: Date = new Date(
      currentDate.getFullYear(),
      currentMonth,
      1,
    );
    const endOfMonth: Date = new Date(
      currentDate.getFullYear(),
      currentMonth + 1,
      0,
    );

    const startOfWeek: number = startOfMonth.getDay();
    const daysInMonth: number = endOfMonth.getDate();

    return Math.ceil((daysInMonth + startOfWeek) / 7);
  }

  is_date_valid(date: string): boolean {
    const MAX_YEAR_LIMIT = maxADYear;
    const MIN_YEAR_LIMIT = minADYear;

    const split_dates = date.split('-');

    return (
      parseInt(split_dates[0]) < MAX_YEAR_LIMIT &&
      parseInt(split_dates[0]) > MIN_YEAR_LIMIT &&
      dayjs(date, 'YYYY-MM-DD', true).isValid()
    );
  }

  is_date_in_range(
    dateToValidate: string,
    disableDateBefore: string,
    disableDateAfter: string,
  ): boolean {
    let condition = dateFormat.test(dateToValidate);

    if (disableDateBefore) {
      condition =
        condition && dayjs(dateToValidate).isAfter(dayjs(disableDateBefore));
    }

    if (disableDateAfter) {
      condition =
        condition && dayjs(dateToValidate).isBefore(dayjs(disableDateAfter));
    }

    return condition;
  }

  get_previous_year_date(date: string): string {
    return dayjs(date).subtract(1, 'year').format(DEFAULT_DATE_FORMAT);
  }

  get_previous_month_date(date: string): string {
    return dayjs(date).subtract(1, 'month').format(DEFAULT_DATE_FORMAT);
  }

  get_previous_decade_date(date: string): string {
    return dayjs(date).subtract(10, 'year').format(DEFAULT_DATE_FORMAT);
  }

  get_next_year_date(date: string): string {
    return dayjs(date).add(1, 'year').format(DEFAULT_DATE_FORMAT);
  }

  get_next_decade_date(date: string): string {
    return dayjs(date).add(10, 'year').format(DEFAULT_DATE_FORMAT);
  }

  get_next_month_date(date: string): string {
    return dayjs(date).add(1, 'month').format(DEFAULT_DATE_FORMAT);
  }

  get_total_days_in_month(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth();

    return new Date(year, month + 1, 0).getDate();
  }

  get_first_day_of_the_month(date: Date): number {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();

    const firstDayOfMonth: Date = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
  }

  get_primary_day_info(
    weekNum: any,
    weekDayNum: any,
    calendar_date: any,
    input_date?: any,
  ): IDayInfo {
    const formattedDate = dayjs(calendar_date).format('YYYY-MM-DD');
    const inputDate: Date = new Date(formattedDate);

    const firstDay: number = this.get_first_day_of_the_month(inputDate);
    let primaryDay = weekNum * 7 + weekDayNum - firstDay;
    let primaryMonth: number = inputDate.getMonth() + 1;
    let primaryYear: number = inputDate.getFullYear();

    const total_no_of_days_in_this_month = this.get_total_days_in_month(
      new Date(formattedDate),
    );

    let isCurrentMonth = true;

    if (primaryDay <= 0) {
      primaryYear = primaryMonth === 1 ? primaryYear - 1 : primaryYear;
      primaryMonth = primaryMonth === 1 ? 12 : primaryMonth - 1;
      isCurrentMonth = false;

      const stiched = utilities.stitch_date({
        year: primaryYear,
        month: primaryMonth,
        day: 1,
      });

      const total_no_of_days_in_previous_month = this.get_total_days_in_month(
        new Date(stiched),
      );
      primaryDay = total_no_of_days_in_previous_month + primaryDay;
    } else if (primaryDay > total_no_of_days_in_this_month) {
      primaryYear = primaryMonth === 12 ? primaryYear + 1 : primaryYear;
      primaryMonth = primaryMonth === 12 ? 1 : primaryMonth + 1;
      primaryDay = primaryDay - total_no_of_days_in_this_month;
      isCurrentMonth = false;
    }

    const latest_stiched_date = utilities.stitch_date({
      year: primaryYear,
      month: primaryMonth,
      day: primaryDay,
    });

    const converted_nepali_date = ADToBS(new Date(latest_stiched_date));
    const splitted_nepali_date = converted_nepali_date.split('-');
    let isToday = false;
    let isSelected = false;
    if (input_date) {
      isToday = utilities.is_today(new Date(latest_stiched_date));
      isSelected = dayjs(latest_stiched_date).isSame(dayjs(input_date), 'day');
    }

    return {
      primaryDay,
      primaryMonth,
      primaryYear,
      secondaryDay: parseInt(splitted_nepali_date[2]),
      secondaryMonth: parseInt(splitted_nepali_date[1]),
      secondaryYear: parseInt(splitted_nepali_date[0]),
      isCurrentMonth, // required to enable current month dates
      isToday,
      isSelected,
    };
  }
}
