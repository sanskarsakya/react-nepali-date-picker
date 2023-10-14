import {zero_pad} from "./zero_pad";

export const stitch_date = (date: any, separator = '-'): string => {
    return `${date.year}${separator}${zero_pad(date.month)}${separator}${zero_pad(
        date.day,
    )}`;
};