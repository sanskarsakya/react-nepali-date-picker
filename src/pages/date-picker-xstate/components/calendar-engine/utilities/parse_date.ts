import { NEPALI_DATE } from "../use-cases";
import { BSToAD } from "bikram-sambat-js";
import * as from_utilities from ".";
import { isEmpty } from "lodash";

export const parse_date = (date: string, separator = "-"): any => {
  if (isEmpty(date)) {
    return null;
  }
  const { year, month, day }: any = from_utilities.split_date(date, separator);

  // from_utilities.validateDateObject({year, month, day});

  const adDate = new Date(BSToAD(date));

  const firstAdDateInBSMonth = new Date(BSToAD(from_utilities.stitch_date({ year, month, day: 1 }, separator)));
  const numberOfDaysInMonth = NEPALI_DATE.get_number_of_days_in_BS_month({ year, month });

  return {
    adDate,
    bsDay: day,
    bsMonth: month,
    bsYear: year,
    firstAdDayInBSMonth: firstAdDateInBSMonth,
    numberOfDaysInBSMonth: numberOfDaysInMonth,
    weekDay: adDate.getDay(),
  };
};
