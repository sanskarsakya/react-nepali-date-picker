// migrated
import { get_first_day_of_the_month } from "./get_first_day_of_the_month";
import { ENGLISH_DATE } from ".";
import dayjs from "dayjs";
import * as from_utilities from "../../utilities";
import { ADToBS } from "bikram-sambat-js";
import { is_today } from "./is_today";
import * as fromCalendarEngine from "../../index";
import { englishToNepaliNumber } from "nepali-number";

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
    isDisabled = !isCurrentMonth ||
     (disable_date_before && dayjs(latest_stiched_date).isBefore(disable_date_before))
     || (disable_date_after && dayjs(latest_stiched_date).isAfter(disable_date_after));
  }

  return {
    workingDay: parseInt(splitted_nepali_date[2]),
    workingMonth: parseInt(splitted_nepali_date[1]),
    workingYear: parseInt(splitted_nepali_date[0]),
    primaryDay : englishToNepaliNumber(primaryDay),
    primaryMonth:englishToNepaliNumber(primaryMonth),
    primaryYear:englishToNepaliNumber(primaryYear),
    secondaryDay: parseInt(splitted_nepali_date[2]),
    secondaryMonth: parseInt(splitted_nepali_date[1]),
    secondaryYear: parseInt(splitted_nepali_date[0]),
    isCurrentMonth, // required to enable current month dates
    isToday,
    isSelected,
    isDisabled,
  };
};
