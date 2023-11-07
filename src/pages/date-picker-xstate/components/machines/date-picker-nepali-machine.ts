import dayjs from "dayjs";
import { createMachine } from "xstate";
import { ENGLISH_MONTHS, IDayInfo, NEPALI_DATE, parse_date, range, stitch_date } from "../../../../components/nepali-date-picker/components/nepali-date-picker copy/calendar-engine";
import { englishToNepaliNumber } from "nepali-number";
import { ADToBS } from "bikram-sambat-js";
import { isEmpty } from "lodash";

export const nepaliMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbMA7CqBOABAAoCWAxgNZh4DEA9lgPq4AuYjJWADgK4sDaABgC6iUFzqwSLEgzEgAHogAsAJgA0IAJ6IAHAE4AbADoAjId2rdAdmvLrAVkNWAvi81pMOfMXJU8xiQQmPRc2IxkGNi4eEKiSCASUjJyCUoIqtaqxroOyvr6uqYOAMzWhqYlhpo6CKamqoLGmSWq+sWVgoYODm4eUd6EpJTUxpFeMYwARnQQWox0YViQ9Ex0fFIQ7GTofnHySdKyWPLp5g6mxsrKDoIlutf5ljWIhQ7N1q3tFyVdPX0gTzRHzDfxjAaTGZzBZLSDGXDzABuJDAAHdGABbWZgVaMZYKFiYhgsAAWEV2lH2CUOKROaUQrRKZkMBRsykEylM+mULwQtn0OVuglUJXZv30HIBQMGvhGAXGwLw01m80W2DhCMYyLRRK2uPxhK0YHw5L2IgOkiOqVA6RKJUuDn0qiFmUEtmcvMMdzMukEfuUvxK+nuvXcgIhIL8owVg2V0LVywg8NQSJR6KxeoYjC4eDAyPWsEYRpNOzN8XEltppwZ5g+dl0VTyVlUPO0KlUJlurIcjXsukMhhKUojQyj8pHcdVsKTmu16exuJzedkPELWKwpNNlPN1Mrx2rCF+1kF+UKxTKFSqvJbAoefsEhXadsyumHE0jcvB76VUKn6pnKZammuo4lmLCzIBpbbuWiR7taiiIOclzXLc9yPIUGhtggvq6MYXp2o6bzitYb6KrKYIxpCKowv+yapjqGagUwmqwGAmBkLSVIVsk+70nUhiclcNx3A81wYZ6gjvIIDYlI61hGChr5htKMTkdGE6-jRiZ0UBDELlm66bnOIFbhQXGwTx8HpA48lXByZ5qNcuS8tY9Q5EUFjWLovpVEp-Tfmp47fpOWkaoBxmMbixZKhF2KmeZNK8TaiA2QK7JPKYjnKM5WEPEy9QNg4RQdm6JHKSOgVfoqIUJnChlkrFmZMPVjCsexnE7txVp0slCCDlJN7KAJjp+k4vJFbh7TmOKXoCaRMqgupwWabVSYtY1THZrm+arkWxpKlBZmdRZ3UHg2AqCMUl1um6jQXJ6lR4a5Fick4+SDvNqmLUF1UrdOxjrcBkVZgae0lhSR0wYlVl6PkxjtKy9QTXkra1Bcx49OY9j5D8eSfR+FEadRq3GNFunzk1YNKm1YAcccCVwT1CF1Jl7xFPkjSSd0DTVFhhFXMGLQ3JkmXKPjo6fpRJp-bRgN6ZTZMbfFx3Q0zZwPk0qimH6vzCk6zjWC5qjZENdqBlk1wiuLlVSz+xP-YrQP6UwoNbJEWzK1DjMHpU1xmDZpv3MVmUPU0rQivcvxa90hjW99VWxjL2mO-Lm1LjthZu6gHuHQzllq4hz7w16foijZLY2eNmXNMK9wNEY3llG4YZYNi8AJCpBPUBa+cHgAtLztR9yK8MFGP49j9JcdjoEwRgD3p18aYNjHrrdzdIUdiiry+hecYdoBjcpjlOdqjT5LRPxtOC9Vnxzq3nkiOlOUlSD4gg5XEKfp3lYu+x+VAV462xqv9WcTstg3ySszUUygchlFuGocUu97A7wqMYC4BRH6-AeBUc+hNlr21lsSBq4D567l7nxGwTQ7j5HKHQoaAkXLV3kucSwODbh+XDIAmewCk5whThTMhXVb69VfiYXezoRSPDdA8JhyFEE-BsDg5uLggA */
    context: {
      date: "",
      calendar_reference_date: dayjs().format("YYYY-MM-DD"),
      grid_dates: [],
      show_calendar_body: "",
      panel_year: "",
      panel_month: "",
      disable_date_before: "2023-07-29",
      disable_date_after: "2023-10-29",
      grid_years: [],
      error: "",
      grid_months: ENGLISH_MONTHS,
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
        entry: [
          {
            type: "setGridDates",
          },
          {
            type: "setPanelMonth",
          },
          {
            type: "setPanelYear",
          },
        ],
        initial: "day_view_mode",
        states: {
          day_view_mode: {
            on: {
              on_next_month_click: {
                target: "day_view_mode",
                internal: false,
                actions: ["increment_month", "setGridDates", "setPanelYear", "setPanelMonth"],
              },

              on_next_year_click: {
                internal: true,
                actions: ["increment_year", "setPanelMonth", "setPanelYear", "setGridDates"],
              },

              on_previous_year_click: {
                internal: true,
                actions: ["decrement_year", "setPanelMonth", "setPanelYear", "setGridDates"],
              },

              on_previous_month_click: {
                internal: true,
                actions: ["decrement_month", "setGridDates", "setPanelYear", "setPanelMonth"],
              },

              on_today_click: {
                target: "#Calendar Picker.idle",
                actions: ["setToday", "setGridDates", "setPanelMonth", "setPanelYear"],
              },

              on_day_selection: {
                actions: ["setDate", "setCalendarReferenceDate", "setGridDates", "setPanelMonth", "setPanelYear"],
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
                actions: ["selectMonth", "setGridDates"],
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
                actions: ["selectYear", "setGridDates"],
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
      },
    },

    schema: {
      events: {} as { type: "setNextYearForMonthView" } | { type: "setPreviousYearForMonthView" } | { type: "on_date_input" } | { type: "sync_date" } | { type: "on_outside_click" } | { type: "open_calendar" } | { type: "on_today_click" } | { type: "on_next_month_click" } | { type: "on_previous_month_click" } | { type: "on_next_year_click" } | { type: "on_previous_year_click" } | { type: "on_next_decade_click" } | { type: "on_previous_decade_click" } | { type: "on_year_selection" } | { type: "on_month_selection" } | { type: "on_day_selection" } | { type: "on_month_view_mode_click" } | { type: "on_year_view_mode_click" },
    },

    predictableActionArguments: true,
    preserveActionOrder: true,

    on: {
      on_date_input: {
        target: ".calendar_body_opened",
        actions: ["setDate", "setCalendarReferenceDate", "setPanelMonth", "setPanelYear", "setGridDates"],
      },
    },
  },
  {
    actions: {
      setDate,
      setCalendarReferenceDate,
      setGridDates,
      setPanelMonth,
      setPanelYear,
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
    },
    services: {},
    guards: {},
    delays: {},
  }
);

// ACTIONS
function setDate(context: any, event: any) {
  console.log(event?.data?.date);
  context.date = event?.data?.date ?? dayjs().format("YYYY-MM-DD");
}
function setCalendarReferenceDate(context: any, event: any) {
  context.calendar_reference_date = dayjs().format("YYYY-MM-DD");
  const validation_result = validate(event?.data?.date, context.disable_date_before, context.disable_date_after);
  console.log({ validation_result });
  if (validation_result.is_valid) {
    if (event?.data?.date) {
      context.calendar_reference_date = event?.data?.date ?? dayjs().format("YYYY-MM-DD");
    }
    context.error = "";
  } else {
    context.error = validation_result.message;
  }
}
function setGridDates(context: any) {
  const normalized_calendar_date = NEPALI_DATE.get_normalized_date(context.calendar_reference_date, "ENGLISH");

  const normalized_date = NEPALI_DATE.get_normalized_date(isEmpty(context.date) ? dayjs().format("YYYY-MM-DD") : context.date, "ENGLISH");

  const parsed_date = parse_date(normalized_calendar_date);

  const selectedDate = parse_date(normalized_date);

  const weeks_in_month = NEPALI_DATE.get_weeks_in_month(parsed_date);

  const calendarDates: IDayInfo[][] = range(0, weeks_in_month - 1).map((weekNum: number) => {
    return range(1, 7).map((weekDayNum: number) => {
      return NEPALI_DATE.get_day_info(weekNum, weekDayNum, parsed_date, selectedDate);
    });
  });

  console.log({calendarDates})

  context.grid_dates = calendarDates;
}
function setPanelMonth(context: any) {
  const now = new Date(context.calendar_reference_date);
  context.panel_month = now.getMonth();
}
function setPanelYear(context: any) {
  const panel_converted_nepali_date = ADToBS(new Date(context.calendar_reference_date));
  const panel_splited_nepali_date = panel_converted_nepali_date.split("-");

  context.panel_year = englishToNepaliNumber(panel_splited_nepali_date[0]);
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
function setToday(context: any) {
  const today = dayjs().format("YYYY-MM-DD");
  context.date = today;
  context.calendar_reference_date = today;
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

// UTILITIES
export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

function validate(val: string, disableDateAfter: string, disableDateBefore: string) {
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

  const is_date_valid_inside_range = disableDateBefore && dayjs(val).isBefore(disableDateBefore) && disableDateAfter && dayjs(val).isAfter(disableDateAfter);
  if (!is_date_valid_inside_range) {
    return {
      message: "This date is out of range in nepal",
      is_valid: false,
    };
  }

  return {
    is_valid: true,
    message: "",
  };
}

function get_year_list_in_decade(current_year: number) {
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
