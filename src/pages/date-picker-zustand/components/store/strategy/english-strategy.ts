import { ADToBS, BSToAD } from "bikram-sambat-js";
import dayjs from "dayjs";
import { englishToNepaliNumber } from "nepali-number";
import { ENGLISH_DATE, ENGLISH_MONTHS, nepaliMonthMap, range, stitch_date } from "../../calendar-engine";
import { get_year_list_in_decade, validate } from "../utils";
import { ICalendarStrategy } from "./interface";
import { Next } from "../utils/execution-pipeline";

/**
 * Global referece for today's date
 */
const today = dayjs().format("YYYY-MM-DD");

export const EnglishStrategy: ICalendarStrategy = {
    setDate: function (ctx, next): void {
        ctx.next.date = ctx.params.date;
        next();
    },

    setCalendarReferenceDate: function (ctx, next): void {
        ctx.next.calendarReferenceDate = ctx.next.date ?? dayjs().format("YYYY-MM-DD");
        next();
    },

    setDisableDateBefore: function (ctx, next): void {
        if (ctx.params.disableDateBefore) {
            ctx.next.disableDateBefore = ctx.params.disableDateBefore;
        }
        next();
    },

    setDisableDateAfter: function (ctx, next): void {
        if (ctx.params.disableDateAfter) {
            ctx.next.disableDateAfter = ctx.params.disableDateAfter;
        }
        next();
    },

    setIsTodayValid: (ctx, next) => {
        const validation_result = validate(today, ctx.next?.disableDateBefore, ctx.next?.disableDateAfter);
        ctx.next.isTodayValid = validation_result.is_valid;

        next();
    },

    setGridDates: function (ctx, next): void {
        const weeks_in_english_month = ENGLISH_DATE.get_weeks_in_month(new Date(ctx.next.calendarReferenceDate));
        ctx.next.gridDates = range(0, weeks_in_english_month - 1).map((weekNum: number) => {
            return range(1, 7).map((weekDayNum: number) => {
                return ENGLISH_DATE.get_day_info(
                    weekNum,
                    weekDayNum,
                    ctx.next.calendarReferenceDate,
                    ctx.next.date,
                    ctx.next.disableDateBefore,
                    ctx.next.disableDateAfter
                );
            });
        });
        next();
    },

    setMonthYearPanelData: function (ctx, next): void {
        const now = new Date(ctx.next.calendarReferenceDate);
        const nepaliDate = ADToBS(ctx.next.calendarReferenceDate);
        const splited = nepaliDate.split("-");
        const nepaliYear = englishToNepaliNumber(splited[0]);

        ctx.next.monthYearPanelData = `${nepaliMonthMap[now.getMonth()]} ${nepaliYear}`;

        next();
    },

    setCalendarControllerLabels: function (ctx, next): void {
        const [year, month] = ctx.next.calendarReferenceDate.split("-");
        ctx.next.controllerLabel.month = ENGLISH_MONTHS[+month - 1];
        ctx.next.controllerLabel.year = year;

        next();
    },

    incrementMonth: function (ctx, next): void {
        ctx.next.calendarReferenceDate = dayjs(ctx.next.calendarReferenceDate).add(1, "month").format("YYYY-MM-DD");

        next();
    },

    decrementMonth: function (ctx, next): void {
        ctx.next.calendarReferenceDate = dayjs(ctx.next.calendarReferenceDate).subtract(1, "month").format("YYYY-MM-DD");

        next();
    },
    incrementYear: function (ctx, next): void {
        ctx.next.calendarReferenceDate = dayjs(ctx.next.calendarReferenceDate).add(1, "year").format("YYYY-MM-DD");

        next();
    },
    decrementYear: function (ctx, next): void {
        ctx.next.calendarReferenceDate = dayjs(ctx.next.calendarReferenceDate).subtract(1, "year").format("YYYY-MM-DD");

        next();
    },

    setTodayAsDate: function (ctx, next): void {
        ctx.next.date = today;

        next();
    },

    setTodayAsCalendarReferenceDate: function (ctx, next): void {
        ctx.next.calendarReferenceDate = today;
        next();
    },
    setViewModeToMonth: function (ctx, next): void {
        ctx.next.viewMode = "MONTH_VIEW";
        next();
    },
    setViewModeToYear: function (ctx, next): void {
        ctx.next.viewMode = "YEAR_VIEW";
        next();
    },
    setViewModeToCalendar: function (ctx, next): void {
        ctx.next.viewMode = "CALENDAR_VIEW";
        next();
    },
    setGridYears: function (ctx, next): void {
        const currentYear = +ctx.next.calendarReferenceDate.split("-")[0];
        const yearGrid = get_year_list_in_decade(currentYear);
        ctx.next.gridYears = [yearGrid[0] - 1, ...yearGrid, yearGrid[yearGrid.length - 1] + 1];

        next();
    },
    updateGridYearWithNextDecade: function (ctx, next): void {
        const currentDecadeLastYear = ctx.next.gridYears[ctx.next.gridYears.length - 1];
        const yearGrid = get_year_list_in_decade(currentDecadeLastYear);
        ctx.next.gridYears = [yearGrid[0] - 1, ...yearGrid, yearGrid[yearGrid.length - 1] + 1];

        next();
    },
    updateGridYearWithPreviousDecade: function (ctx, next): void {
        const currentDecadeLastYear = ctx.next.gridYears[0];
        const yearGrid = get_year_list_in_decade(currentDecadeLastYear);
        ctx.next.gridYears = [yearGrid[0] - 1, ...yearGrid, yearGrid[yearGrid.length - 1] + 1];

        next();
    },
    selectYear: function (ctx, next): void {
        ctx.next.calendarReferenceDate = stitch_date(
            {
                year: ctx.params.year,
                month: +ctx.next.calendarReferenceDate.split("-")[1],
                day: 1,
            },
            "-"
        );
        next();
    },
    updateMonthViewWithNextYear: function (ctx, next): void {
        const split_date = ctx.next.calendarReferenceDate.split("-");
        ctx.next.calendarReferenceDate = stitch_date({
            year: +split_date[0] + 1,
            month: +split_date[1],
            day: +split_date[2],
        });

        next();
    },
    updateMonthViewWithPreviousYear: function (ctx, next): void {
        const split_date = ctx.next.calendarReferenceDate.split("-");
        ctx.next.calendarReferenceDate = stitch_date({
            year: +split_date[0] - 1,
            month: +split_date[1],
            day: +split_date[2],
        });

        next();
    },
    selectMonth: function (ctx, next): void {
        ctx.next.calendarReferenceDate = stitch_date({
            year: +ctx.next.calendarReferenceDate.split("-")[0],
            month: ctx.params.month,
            day: 1,
        },
            "-"
        );

        next();
    },
    closeCalendarPicker: function (ctx, next): void {
        ctx.next.onClose();
        next();
    },
    checkIfTodayIsValid: function (ctx, next): void {
        const validation_result = validate(today, ctx.next.disableDateBefore, ctx.next.disableDateAfter);

        if (validation_result.is_valid) {
            next();
        }
    },
    checkIfDateIsValid: function (ctx, next): void {
        const validation_result = validate(ctx.next.date, ctx.next.disableDateBefore, ctx.next.disableDateAfter);

        if (validation_result.is_valid) {
            ctx.next.error = "";
            next();
        } else {
            ctx.next.error = validation_result.message;
        }
    },

    convertdatesToCurrentContext: function (ctx, next): void {
        if (ctx.next.date) {
            ctx.next.date = BSToAD(ctx.next.date);
        }
        if (ctx.next.disableDateBefore) {
            ctx.next.disableDateBefore = BSToAD(ctx.next.disableDateBefore);
        }
        if (ctx.next.disableDateAfter) {
            ctx.next.disableDateAfter = BSToAD(ctx.next.disableDateAfter);
        }
        next();
    },
    setGridMonths: function (ctx: any, next: Next<any>): void {
        ctx.next.gridMonths = ENGLISH_MONTHS;
        next();
    },
    sendChanges: function (ctx: any, next: Next<any>): void {
        ctx.next.onChange({
            date: ctx.next.date,
            isNepali: ctx.next.isNepali,
        });
        next();
    },
    normalizeDates: function (ctx: any, next: Next<any>): void {
        next();
    },
}