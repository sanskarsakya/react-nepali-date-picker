import * as from_utilities from "../../utilities";
import { ADToBS } from "bikram-sambat-js";
import { NEPALI_DATE } from ".";
import { ENGLISH_DATE } from "../english_date";
import * as fromCalendarEngine from "../../index";
import { englishToNepaliNumber } from "nepali-number";

export const get_day_info = (weekNum: any, weekDayNum: any, date: any, selectedDate?: any): fromCalendarEngine.IDayInfo => {
  const firstAdDay = date.firstAdDayInBSMonth.getDay();
  let primaryDay = weekNum * 7 + weekDayNum - firstAdDay;
  let primaryMonth = date.bsMonth;
  const primaryYear = date.bsYear;

  let isCurrentMonth = true;

  if (primaryDay <= 0) {
    primaryDay = NEPALI_DATE.previous_month_days(date) + primaryDay;
    isCurrentMonth = false;
    primaryMonth = date.bsMonth === 1 ? 12 : date.bsMonth - 1;
  } else if (primaryDay > date.numberOfDaysInBSMonth) {
    primaryDay = primaryDay - date.numberOfDaysInBSMonth;
    isCurrentMonth = false;
    primaryMonth = date.bsMonth === 12 ? 1 : date.bsMonth + 1;
  }

  const today = from_utilities.split_date(ADToBS(new Date()));

  const isToday = isCurrentMonth ? today.day === primaryDay && today.month === date.bsMonth && today.year === date.bsYear : false;
  const isSelected = isCurrentMonth ? selectedDate.bsDay === primaryDay && selectedDate.bsMonth === date.bsMonth && selectedDate.bsYear === date.bsYear : false;

  const engDayInfo = ENGLISH_DATE.get_eng_day_info(primaryYear, primaryMonth, primaryDay);
  return {
    workingDay: engDayInfo.engDay,
    workingMonth: engDayInfo.engMonth,
    workingYear: engDayInfo.engYear,
    primaryDay: englishToNepaliNumber(primaryDay),
    primaryMonth: englishToNepaliNumber(primaryMonth),
    primaryYear: englishToNepaliNumber(primaryYear),
    secondaryDay: engDayInfo.engDay,
    secondaryMonth: engDayInfo.engMonth,
    secondaryYear: engDayInfo.engYear,
    isCurrentMonth,
    isToday,
    isSelected,
    isDisabled: false,
  };
};
