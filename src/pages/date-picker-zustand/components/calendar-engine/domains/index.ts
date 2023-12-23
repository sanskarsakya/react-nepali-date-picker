export type voidFunction = () => void;
export const ENGLISH = 'en';
export const NEPALI = 'ne';
export const BS = 'BS';
export const AD = 'AD';

export type localeType = 'en' | 'ne';

export const CALENDAR_MODE = {
  NEPALI: 'NEPALI',
  ENGLISH: 'ENGLISH',
};

export const VIEW_MODE = {
  CALENDAR: 'CALENDAR',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

export type type_calendar_mode =
  | typeof CALENDAR_MODE.NEPALI
  | typeof CALENDAR_MODE.ENGLISH;

export interface NepaliDatePickerOptions {
  closeOnSelect: boolean;
  calenderLocale: localeType;
  valueLocale: localeType;
}

export interface NepaliDatepickerEvents {
  change: (value: string) => void;
  yearSelect?: (year: number) => void;
  monthSelect?: ({ year, month }: YearMonth) => void;
  daySelect?: ({ year, month, day }: YearMonthDate) => void;
  previousMonthSelect?: ({ month, year }: YearMonth) => void;
  nextMonthSelect?: ({ year, month }: YearMonth) => void;
  todaySelect?: ({ year, month, day }: YearMonthDate) => void;
}

export interface ParsedDate {
  bsYear: number;
  bsMonth: number;
  bsDay: number;
  weekDay: number;
  adDate: Date;
  numberOfDaysInBSMonth: number;
  firstAdDayInBSMonth: Date;
}

export const parsedDateInitialValue: ParsedDate = {
  adDate: new Date(),
  bsDay: 0,
  bsMonth: 0,
  bsYear: 0,
  firstAdDayInBSMonth: new Date(),
  numberOfDaysInBSMonth: 0,
  weekDay: 0,
};

export interface SplittedDate {
  year: number;
  month: number;
  day: number;
}

export type YearMonthDate = SplittedDate;

export interface YearMonth {
  year: number;
  month: number;
}

export const DATE_TYPE_ENGLISH = 'ENGLISH';
export const DATE_TYPE_NEPALI = 'NEPALI';

export interface INormalizedDate {
  date: any;
  calendar_date: any;
  dateType: typeof DATE_TYPE_ENGLISH | typeof DATE_TYPE_NEPALI;
}

export interface IDayInfo {
  workingDay?: number;
  workingMonth?: number;
  workingYear?: number;
  primaryDay: string | number;
  primaryMonth: string | number;
  primaryYear: string | number;
  secondaryDay: string | number ;
  secondaryMonth :string |  number;
  secondaryYear: string | number;
  isCurrentMonth: boolean; // required to enable current month dates
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface DATE_FUNCTION {
  get_day_info: any;
  get_first_day_of_the_month: any;
  get_total_days_in_month: any;
  get_weeks_in_month: any;
  get_normalized_date: any;
  get_eng_day_info: any;
  get_next_month_date: any;
  get_previous_month_date: any;
  get_next_year_date: any;
  get_previous_year_date: any;
  get_previous_decade_date: any;
  get_next_decade_date: any;
  is_today: any;
  is_date_valid: any;
  get_number_of_days_in_BS_month: any;
  previous_month: any;
  previous_month_days: any;
  previous_year: any;
  validate_date_in_range: any;
}
