import * as from_constants from "../../constants";
import {get_number_of_days_in_BS_month} from "./get_number_of_days_in_BS_month";
import {previous_month} from "./previous_month";
import {previous_year} from "./previous_year";

export const previous_month_days = (date: any) =>
    previous_year(date) >= from_constants.minBSYear
        ? get_number_of_days_in_BS_month({
            month: previous_month(date),
            year: previous_year(date),
        })
        : 30