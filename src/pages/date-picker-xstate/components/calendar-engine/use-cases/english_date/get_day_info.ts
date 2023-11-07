// LIBS
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
import { ADToBS } from "bikram-sambat-js";
import { englishToNepaliNumber } from "nepali-number";

// UTILITIES
import { ENGLISH_DATE } from ".";
import { get_first_day_of_the_month } from "./get_first_day_of_the_month";
import { is_today } from "./is_today";
import * as fromCalendarEngine from "../../index";
import * as from_utilities from "../../utilities";

dayjs.extend(isBetween)

export const get_day_info = (weekNum: any, weekDayNum: any, calendar_date: any, input_date?: any, disable_date_before?: any, disable_date_after?: any): fromCalendarEngine.IDayInfo => {
  const formattedDate = dayjs(calendar_date).format("YYYY-MM-DD");
  const inputDate: Date = new Date(formattedDate);

  const firstDay: number = get_first_day_of_the_month(inputDate);
  let primaryDay = weekNum * 7 + weekDayNum - firstDay;
  let primaryMonth: number = inputDate.getMonth() + 1;
  let primaryYear: number = inputDate.getFullYear();

  const total_no_of_days_in_this_month = ENGLISH_DATE.get_total_days_in_month(new Date(formattedDate));

  let isCurrentMonth = true;

  if (primaryDay <= 0) {
    primaryYear = primaryMonth === 1 ? primaryYear - 1 : primaryYear;
    primaryMonth = primaryMonth === 1 ? 12 : primaryMonth - 1;
    isCurrentMonth = false;

    const stiched = from_utilities.stitch_date({
      year: primaryYear,
      month: primaryMonth,
      day: 1,
    });

    const total_no_of_days_in_previous_month = ENGLISH_DATE.get_total_days_in_month(new Date(stiched));
    primaryDay = total_no_of_days_in_previous_month + primaryDay;
  } else if (primaryDay > total_no_of_days_in_this_month) {
    primaryYear = primaryMonth === 12 ? primaryYear + 1 : primaryYear;
    primaryMonth = primaryMonth === 12 ? 1 : primaryMonth + 1;
    primaryDay = primaryDay - total_no_of_days_in_this_month;
    isCurrentMonth = false;
  }

  const latest_stiched_date = from_utilities.stitch_date({
    year: primaryYear,
    month: primaryMonth,
    day: primaryDay,
  });

  const converted_nepali_date = primaryYear > 999 && primaryYear < 2042 ? ADToBS(new Date(latest_stiched_date)) : "2099-12-31";
  const splitted_nepali_date = converted_nepali_date.split("-");
  let isToday = false;
  let isSelected = false;
  let isDisabled = false;
  if (input_date) {
    isToday = is_today(new Date(latest_stiched_date));
    isSelected = dayjs(latest_stiched_date).isSame(dayjs(input_date), "day");
  }
  
  const isInBetween = dayjs(latest_stiched_date).isBetween(disable_date_before, disable_date_after, 'day', '[)')
  isDisabled = !isCurrentMonth || !isInBetween;

  return {
    workingDay    : primaryDay,
    workingMonth  : primaryMonth,
    workingYear   : primaryYear,
    primaryDay    : primaryDay,
    primaryMonth  : primaryMonth,
    primaryYear   : primaryYear,
    secondaryDay  : englishToNepaliNumber(parseInt(splitted_nepali_date[2])) as string,
    secondaryMonth: englishToNepaliNumber(parseInt(splitted_nepali_date[1])) as string,
    secondaryYear : englishToNepaliNumber(parseInt(splitted_nepali_date[0])) as string,
    isCurrentMonth, 
    isToday,
    isSelected,
    isDisabled,
  };
};
