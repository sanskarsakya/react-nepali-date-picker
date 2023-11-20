import { ADToBS, BSToAD } from "bikram-sambat-js";
import dayjs from "dayjs";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "nepali-number";
import { createMachine } from "xstate";
import { IDayInfo, NEPALI_DATE, englishMonthMap, months, parse_date, range, stitch_date, weeks } from "..//calendar-engine";
export const nepaliMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbMA7CqBOABAAoCWAxgNZh4DEA9lgPq4AuYjJWADgK4sDaABgC6iUFzqwSLEgzEgAHogBMANgB0AdgCc2gMwBWQQEZjAFm0GDADk0AaEAE9E25cfWHjg63u1mbgvoAvkEOaJg4+MTkVLSwjlhkjFx4dFywQqJIIBJSMnLZSggAtG7u1gZmtspumkY6eg7OCAY66hbWgqpWqtaqpmYhYRjYuISklNTqJBCY9FzYjGQjkXiZ8rnSsljyRXqCBurK2l16qgd9uk2IA4Lq2saVemZ6l5qqqkMg4aNRE7HqZYRMaMABGdAgjkYaWwkHoTDofCkEHYZHQMXW2U2+R2hRuvT06msnW6mjMZh0jzM1wQXgO90eelemh0tlUmi+P1W0UmeEBKxB4Mh0IWWEg6lwUIAbiQwAB3RgAWwhYHhjDFChYSoYLAAFkt0ZRMeJJFsCqA9mZ3IIzF0DMY9MZVMcDNpVDTOncLMZtJpBGpNMZ3p9Qt8BX8YlMgb88GCIVCYWKIBLUNLZQrlSi1RqtY4wPgDRiRBtTTjdohntbbd0HU6Xdoac7CdY3JZAyYgzpOeHxpG+dHVnHhYnxZLGDL5dqswxkngwDLEbBGHmC2ii1kTXltuWEJX1Da7bXnZY3TTyZp1I8fS99PbKd3gRHefzH7GhQnRaPU+P01PVTOUnnWQeCXZUsD1QsjWLLFS23PFd1tI4TlUM4LlUK4nBUP12msH19neB5OmeB8Yx5AEB0FeMRVhZMxwnDMVTVFgIW-NcoI3HJYPNRR8R8IkSVac8HkqD1jiOfw9GUAx+mZXCSO5f4ox7IcPxolM00nTN-yYMdYDATAyBxY1OK3biiidTRmwEskKWE6lMIQZ1Dk0KTJKdfwWzdeSxjIpTXxU6ik3Un9NMYmcwIg+i-0gihjOxOCLUQfpymrdDlDqawHmMGlLOUdQDGUM56kywIUO8p9yOU99Aq-DSGOnJgV1jKKtJiuKuNxRLHNMIlUtcDKso9FCtHOdLXWMTKrRDYZX18-sqqokdkwi-UWrCpgVsYPSDKM6DNzNTqeMcx12kEQRA2MNQHVUCwaRsPK-TOF4CX0G7yt7Z8KILaqlvUTa1oa5d82a39WrY2K9pMg6d1MGp1Bu1p9gdXD0vs5oyUJLwDH2Poay6Yx3rml8YwC37-tB9b1TATUgdXQ0IY4+KzMQYk8sMaS3RZQxnTRpLng8B0XN0JyDmUQnFPm-yfs-ZadVWinAcAhcQNp2Nwfa0zDqKWx3H8c6HTdJkUOyhzsesS99HeFk7RscW+2JwdpbUpqQvq7TVa2-SwEM7YNeh+DYcOZ5WkuQinju-QjgqJllHOuplDMMXQy5HyJYdyjhxl9QXYB92c2Yb3UBRNrIaZrWbj0d58v0a8Csy3DGgclC7jdG9AlwllpLtz6Fsz53gddv81SV4ClxRZZi-V0uOphoqPDbTL0NeArG+abGzF68llGqe6KhCUMsBVeBshTirqBLTWd1KdxY66DoKhtK1V8QUptA8bGHX9FtbSTmbSLTmYmAL7+y6nhc2+gujnHMLoa6NJdDgPeC8SSOsWQE2Tj2ImX03yLRlsAss8Fjh5WOKcc4Nh0INlNubUqxJiTnW6McPQ3dKpSxwWpOiCswB4ISkdSuF50qOkkpJG0F04EtkvP0SwxxHiuhckwvyJMnZBXJqFFEXDmYIBOHlCkXQ3RWHcvYByllDhILSm4aw-gpJyMlgo1hQUc4cLUeXWkvg362hbJAqwdCcqSX3OYwwgiWSFX3kEIAA */
    context: {
      date                   : "",
      calendar_reference_date: ADToBS(dayjs().format("YYYY-MM-DD")),
      grid_dates             : [],
      show_calendar_body     : "",
      month_year_panel_data  : "",
      disable_date_before    : "",                             // "2023-07-29",
      disable_date_after     : "",                             // "2023-10-29",
      grid_years             : [],
      error                  : "",
      grid_months            : months.ne,
      is_today_valid         : false,
      date_picker_body_data  : {
        weeks: weeks["en"],
      },
      is_dark: false,
      calendar_controller_labels: {
        month_label: "",
        year_label: "",
      },
    },

    id: "Calendar Picker",
    initial: "idle",

    states: {
      idle: {
        on: {
          open_calendar: {
            target: "calendar_body_opened",
          },
        },
      },

      calendar_body_opened: {
        initial: "day_view_mode",

        states: {
          day_view_mode: {
            on: {
              on_next_month_click: {
                target: "day_view_mode",
                internal: false,
                actions: ["increment_month", "setGridDates", "setMonthYearPanelData", "setCalendarControllerLabels"],
              },

              on_next_year_click: {
                actions: ["increment_year", "setMonthYearPanelData", "setGridDates", "setCalendarControllerLabels"],
              },

              on_previous_year_click: {
                actions: ["decrement_year", "setMonthYearPanelData", "setGridDates", "setCalendarControllerLabels"],
              },

              on_previous_month_click: {
                actions: ["decrement_month", "setGridDates", "setMonthYearPanelData", "setCalendarControllerLabels"],
              },

              on_today_click: {
                target: "#Calendar Picker.idle",
                actions: ["setToday", "setGridDates", "setMonthYearPanelData", "setCalendarControllerLabels"],
              },

              on_day_selection: {
                actions: ["setDate", "setCalendarReferenceDate", "setGridDates", "setMonthYearPanelData", "setCalendarControllerLabels"],
                target: "#Calendar Picker.idle",
              },

              on_month_view_mode_click: {
                target: "month_view_mode",
              },

              on_year_view_mode_click: {
                target: "year_view_mode",
              },
            },
          },

          month_view_mode: {
            on: {
              on_month_selection: {
                target: "day_view_mode",
                actions: ["selectMonth", "setGridDates", "setCalendarControllerLabels"],
              },

              on_year_view_mode_click: "year_view_mode",

              on_next_year_click: {
                target: "month_view_mode",
                internal: true,
                actions: "setNextYearForMonthView",
              },

              on_previous_year_click: {
                target: "month_view_mode",
                internal: true,
                actions: "setPreviousYearForMonthView",
              },
            },
          },

          year_view_mode: {
            on: {
              on_year_selection: {
                target: "month_view_mode",
                actions: ["selectYear", "setGridDates", "setCalendarControllerLabels"],
              },

              on_next_decade_click: {
                target: "year_view_mode",
                internal: true,
                actions: "setYearViewModeNextDecade",
              },

              on_previous_decade_click: {
                target: "year_view_mode",
                internal: true,
                actions: "setYearViewModePreviousDecade",
              },
            },

            entry: "setGridYears",
          },
        },

        on: {
          on_outside_click: {
            target: "idle",
          },
        },

        entry: ["setGridDates", "setMonthYearPanelData", "setIsTodayValid", "setCalendarControllerLabels"],
      }
    },

    schema: {
      events: {} as { type: "sync_props" } | { type: "setNextYearForMonthView" } | { type: "setPreviousYearForMonthView" } | { type: "on_date_input" } | { type: "sync_date" } | { type: "on_outside_click" } | { type: "open_calendar" } | { type: "on_today_click" } | { type: "on_next_month_click" } | { type: "on_previous_month_click" } | { type: "on_next_year_click" } | { type: "on_previous_year_click" } | { type: "on_next_decade_click" } | { type: "on_previous_decade_click" } | { type: "on_year_selection" } | { type: "on_month_selection" } | { type: "on_day_selection" } | { type: "on_month_view_mode_click" } | { type: "on_year_view_mode_click" },
    },

    predictableActionArguments: true,
    preserveActionOrder: true,

    on: {
      on_date_input: {
        target: ".calendar_body_opened",
        actions: ["setDate", "setCalendarReferenceDate", "setMonthYearPanelData", "setGridDates", "setCalendarControllerLabels"],
      },

      sync_props: {
        target: "#Calendar Picker",
        internal: true,
        actions: "setPropsData",
      },
    },
  },
  {
    actions: {
      setDate,
      setCalendarReferenceDate,
      setGridDates,
      setMonthYearPanelData,
      increment_month,
      decrement_month,
      decrement_year,
      increment_year,
      setToday,
      setGridYears,
      selectYear,
      selectMonth,
      setNextYearForMonthView,
      setPreviousYearForMonthView,
      setYearViewModePreviousDecade,
      setYearViewModeNextDecade,
      setIsTodayValid,
      setCalendarControllerLabels,
      setPropsData,
    },
    services: {},
    guards: {},
    delays: {},
  }
);

// ACTIONS
function setDate(context: any, event: any) {
  const working_date = event?.data?.date;
  if (working_date) {
    context.date = working_date ?? dayjs().format("YYYY-MM-DD");

    event?.data?.onChange(working_date ?? dayjs().format("YYYY-MM-DD"));
  }
}

function setPropsData(context: any, event: any) {
  const props = event?.data;
  context.date = props?.date ?? "";
  context.disable_date_before = props?.disable_date_before ?? "";
  context.disable_date_after = props?.disable_date_after ?? "";
  context.calendar_reference_date = ADToBS(dayjs().format("YYYY-MM-DD"));
}

export function setCalendarControllerLabels(context: any) {
  const splited = context.calendar_reference_date.split("-");
  context.calendar_controller_labels.month_label = months.ne[+splited[1] - 1];
  context.calendar_controller_labels.year_label = englishToNepaliNumber(splited[0]);
}

function setCalendarReferenceDate(context: any, event: any) {
  context.calendar_reference_date = ADToBS(dayjs().format("YYYY-MM-DD"));

  let working_date = event?.data?.date;

  const validation_result = validate(BSToAD(working_date), BSToAD(context.disable_date_before), BSToAD(context.disable_date_after));

  if (validation_result.is_valid) {
    if (working_date) {
      working_date = working_date ?? dayjs().format("YYYY-MM-DD");
      context.calendar_reference_date = working_date;
    }
    context.error = "";
  } else {
    context.error = validation_result.message;
  }
}
function setGridDates(context: any) {
  const weeks_in_month = NEPALI_DATE.get_weeks_in_month(parse_date(context.calendar_reference_date));

  const calendarDates: IDayInfo[][] = range(0, weeks_in_month).map((weekNum: number) => {
    return range(1, 7).map((weekDayNum: number) => {
      return NEPALI_DATE.get_day_info(
        //
        weekNum,
        weekDayNum,
        parse_date(context.calendar_reference_date),
        parse_date(context.date),
        context.disable_date_before,
        context.disable_date_after
      );
    });
  });

  context.grid_dates = calendarDates;
}
function setMonthYearPanelData(context: any) {
  const now = new Date(context.calendar_reference_date);

  const panel_converted_english_date = BSToAD(context.calendar_reference_date);
  const panel_splited_english_date = panel_converted_english_date.split("-");

  const year = nepaliToEnglishNumber(panel_splited_english_date[0]);

  const mapped = `${englishMonthMap[now.getMonth()]} ${year}`;

  context.month_year_panel_data = mapped;
}

function increment_month(context: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).add(1, "month").format("YYYY-MM-DD");
}
function decrement_month(context: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).subtract(1, "month").format("YYYY-MM-DD");
}
function increment_year(context: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).add(1, "year").format("YYYY-MM-DD");
}
function decrement_year(context: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).subtract(1, "year").format("YYYY-MM-DD");
}
function setToday(context: any, event: any) {
  const today = dayjs().format("YYYY-MM-DD");

  const today_nepali = ADToBS(today)
  const validation_result = validate(today, BSToAD(context.disable_date_before), BSToAD(context.disable_date_after));

  if (validation_result.is_valid) {
    context.date = today_nepali;
    context.calendar_reference_date = today_nepali;

    event.data?.onChange?.(today_nepali);
  }
}

function setGridYears(context: any) {
  const current_year = +context.calendar_reference_date.split("-")[0];
  const year_grid = get_year_list_in_decade(current_year);
  context.grid_years = [year_grid[0] - 1, ...year_grid, year_grid[year_grid.length - 1] + 1];
}
function selectYear(context: any, event: any) {
  const year = event?.data?.year;
  context.calendar_reference_date = stitch_date(
    {
      year,
      month: +context.calendar_reference_date.split("-")[1],
      day: 1,
    },
    "-"
  );
}

function selectMonth(context: any, event: any) {
  const month = event?.data?.month;
  context.calendar_reference_date = stitch_date(
    {
      year: +context.calendar_reference_date.split("-")[0],
      month,
      day: 1,
    },
    "-"
  );
}
function setPreviousYearForMonthView(context: any) {
  const split_date = context.calendar_reference_date.split("-");
  context.calendar_reference_date = stitch_date({
    year: +split_date[0] - 1,
    month: +split_date[1],
    day: +split_date[2],
  });
}

function setNextYearForMonthView(context: any) {
  const split_date = context.calendar_reference_date.split("-");
  context.calendar_reference_date = stitch_date({
    year: +split_date[0] + 1,
    month: +split_date[1],
    day: +split_date[2],
  });
}

function setYearViewModeNextDecade(context: any) {
  const current_decade_last_year = context.grid_years[context.grid_years.length - 1];
  const year_grid = get_year_list_in_decade(current_decade_last_year);
  context.grid_years = [year_grid[0] - 1, ...year_grid, year_grid[year_grid.length - 1] + 1];
}
function setYearViewModePreviousDecade(context: any) {
  const current_decade_last_year = context.grid_years[0];
  const year_grid = get_year_list_in_decade(current_decade_last_year);
  context.grid_years = [year_grid[0] - 1, ...year_grid, year_grid[year_grid.length - 1] + 1];
}

function setIsTodayValid(context: any) {
  const today = dayjs().format("YYYY-MM-DD");
  const validation_result = validate(today, BSToAD(context.disable_date_before), BSToAD(context.disable_date_after));
  context.is_today_valid = validation_result.is_valid;
}

// UTILITIES
export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

export function check_if_in_range(value: string, disableDateBefore: string, disableDateAfter: string) {
  if (disableDateBefore && dayjs(value).isBefore(dayjs(disableDateBefore))) {
    return false;
  }

  if (disableDateAfter && dayjs(value).isAfter(dayjs(disableDateAfter))) {
    return false;
  }

  return true;
}

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

/**
 * describe('get_year_list_in_decade', () => {
  it('should return the correct decade for a given year', () => {
    expect(get_year_list_in_decade(2021)).toEqual([2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]);
    expect(get_year_list_in_decade(2000)).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009]);
  });

  it('should return the correct decade for a year at the start of a decade', () => {
    expect(get_year_list_in_decade(1990)).toEqual([1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]);
  });

  it('should return the correct decade for a year at the end of a decade', () => {
    expect(get_year_list_in_decade(1999)).toEqual([1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]);
  });
});
 */
