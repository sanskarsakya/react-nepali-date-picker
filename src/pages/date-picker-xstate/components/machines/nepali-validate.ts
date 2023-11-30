import dayjs from "dayjs";
import { check_if_in_range, dateFormat } from "./date-picker-merged-machine";


export function nepaliValidate(val: string, disableDateBefore: string, disableDateAfter: string) {
  const is_date_format_valid = dateFormat.test(val);
  if (!is_date_format_valid) {
    return {
      message: "Invalid format",
      is_valid: false,
    };
  }

  const is_date_valid = dayjs(val, "YYYY-MM-DD", true).isValid();
  if (!is_date_valid) {
    return {
      message: "Invalid date",
      is_valid: false,
    };
  }

  if (+val.slice(0, 4) < 1900) {
    return {
      message: "Date is less than min date",
      is_valid: false,
    };
  }

  if (+val.slice(0, 4) > 2100) {
    return {
      message: "Date is greater than max date",
      is_valid: false,
    };
  }

  const is_date_valid_inside_range = check_if_in_range(val, disableDateBefore, disableDateAfter);

  if (!is_date_valid_inside_range) {
    return {
      message: "This date is out of range",
      is_valid: false,
    };
  }

  return {
    is_valid: true,
    message: "",
  };
}
