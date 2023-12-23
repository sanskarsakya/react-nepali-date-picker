import dayjs from "dayjs";

export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

export function validate(val: string, disableDateBefore: string, disableDateAfter: string) {
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

    if (+val.slice(0, 4) > 2042) {
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

export function check_if_in_range(value: string, disableDateBefore: string, disableDateAfter: string) {
    if (disableDateBefore && dayjs(value).isBefore(dayjs(disableDateBefore))) {
        return false;
    }

    if (disableDateAfter && dayjs(value).isAfter(dayjs(disableDateAfter))) {
        return false;
    }

    return true;
}

export function get_year_list_in_decade(current_year: number) {
    // Calculate the start year of the current decade
    const startYear = Math.floor(current_year / 10) * 10;

    // Create an array to store the years in the current decade
    const decadeYears = [];

    // Add years from the start year to the start year + 9 (inclusive) to the array
    for (let year = startYear; year < startYear + 10; year++) {
        decadeYears.push(year);
    }

    return decadeYears;
}