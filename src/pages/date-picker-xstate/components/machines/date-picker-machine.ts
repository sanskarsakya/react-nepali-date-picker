import { ADToBS } from "bikram-sambat-js";
import dayjs from "dayjs";
import { englishToNepaliNumber } from "nepali-number";
import { createMachine } from "xstate";
import { ENGLISH_DATE, ENGLISH_MONTHS, IDayInfo, nepaliMonthMap, range, stitch_date, weeks } from "..//calendar-engine";
export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbMA7CqBOABAAoCWAxgNZh4DEA9lgPq4AuYjJWADgK4sDaABgC6iUFzqwSLEgzEgAHogBMANgB0AdgCc2gMwBWQQEZjAFm0GDADk0AaEAE9E25cfWHjg63u1mbgvoAvkEOaJg4+MTkVHjqJBCY9FzYjGQY2Lh4QqJIIBJSMnJ5Sgh6ggbqytqCqnqqFdaqug7OCKZmguraxgZmev1N2pqqqiFhGZGEpJTU6ukRWYwARnQQjox0KViQ9Ex0fFIQ7GToMTnyBdKyWPKlxqo+6tbWtQaaZmY6vWatiF4Vbq9PR6Ww6WyqTTjEDhTJRGaxeaTJardabbaQdS4DYANxIYAA7owALZrMB7Rg7BQsEkMFgACzSZ0oFzyVyKtxKiAG7kEnVUBmMege1QM2lUfwQry6FmMw0Eak0xhGY1CMOR8JicwWcLwKzWGy22Ex2MYeMJtOOFKpNMcYHwTPOIkukmuxVApR56j5byFIss2klqmUemebksSpMyp00NhU2isziOqm+rRRp2ECxqFx+KJpKtDEYXDwYDxB1gjDtDtOTty4ldHLu3LMvP5guFwYDEqciE+mnUvTl-X0gu+sY10y1SYnqcNGMzpvNebJFOLpdkPArpKwDMdLOdbIbNybZU6VRqdQaNmagZ7CGUmhl1jl5RGPVeA3Hi01iaR371qJzsaC7ZmauaWuShYsGsoE1vudb5Ee7qKP8jyhi8bwfF8PR9JK1jVFU-h6MoBiqEKtjPl+uoJoiyYoga6LAVmOYWvmkFMKasBgJgZAcqy9aFMeXLtJC6GvAKWHfLhd7BpUmgkcRDz+Ph4pUfGCLajOgGMRmzFgaxK6Ftuu5LhBe4UPxiGCchpRke41j8s0D42D0xiSpoxHqAYIYCoImjWDU4p6GpWQ0Zp-6zjpJqgaZbEUlWeqxWS5mWeyQkeogdnPI5riaC5ph4XUWgNM575+A8IU-rRWkMemmLGYySUFkwDWMFxPF8QeAlupyGUIHU7idH5phqEKqgWJKNjKFogj1P0aH6ONlWTr+dEOtpdWZq1TXsZW9qJeBbEpV1Vk9SeI3TeN7zlORxgPr8d4fKGXgGOUTQCl4ZHLWF04RRt87qNth2GUwNp7dWzIWSdaU2YgLzTYYpHipoHmkcoD1tHUZgeEK8m6LJFTKN9Gm-bqkWbYDdKNcDzVFiWZabuDepwVDCEw71KFSkq6j+MNvh1PUwqTaCA76CMKNvDYxNTn+ZP-UxCX6cutOK+1YC8TcqVIRz9x3ZUAzvEM759Hok36FU1ivcRfl5ejRNqnGoUk7LKby7pis7daYDUsw6uoMcx1s9r516CMXn6EO3kBc+psyeU3Tjb4gTPijpHS6tNVpgDHs07ta4MxWxzpAHLNa9ZOv-PU+sRgFzSgt5sdtK92MOZ8yi2CR+GW+nsQ0LAjhYGQdNbLAZdncJAC05juMogi1BYLxGJ8QqTdzymkTowqW8qIRqlgZLwHkjtVdQLrlyeE9uFUc-jdoi98i2jeIJf2geK9fnPu2L6gj3cwJJgZ9x59RfNYbo5RRgmAsD0eokpdCgOGInYithozGF-qTV2tV5yAMbMJao01qi1HqI0G8k1QGBCcndcaPhXgVQdhOH6Lt6JZyYouXO2D0qc1Dv2B8wpiLWy+AVO8d9poPDlN5HCYp5JoMYetTBTEgYGWOOw2GCAajTS+LUcUVglL2EeoYHmIInJuAct5Aw0i1oATke7faSsILKIru0Xwr9Oj4VqAKIwIx3KeW8P0V6IYUYhl3kEIAA */
    context: {
      date: "",
      calendar_reference_date: dayjs().format("YYYY-MM-DD"),
      grid_dates: [],
      show_calendar_body: "",
      month_year_panel_data: "",
      disable_date_before: "2023-07-29",
      disable_date_after: "2023-10-29",
      grid_years: [],
      error: "",
      grid_months: ENGLISH_MONTHS,
      is_today_valid: false,
      date_picker_body_data: {
        weeks: weeks["en"],
      },
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
        actions: "setPropsData"
      }
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
  context.calendar_reference_date = props?.date ?? dayjs().format("YYYY-MM-DD");
}

function setCalendarControllerLabels(context: any) {
  const splited = context.calendar_reference_date.split("-");
  context.calendar_controller_labels.month_label = ENGLISH_MONTHS[+splited[1] - 1];
  context.calendar_controller_labels.year_label = splited[0];
}
function setCalendarReferenceDate(context: any, event: any) {
  context.calendar_reference_date = dayjs().format("YYYY-MM-DD");

  let working_date = event?.data?.date;

  const validation_result = validate(working_date, context.disable_date_before, context.disable_date_after);

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
  const weeks_in_english_month = ENGLISH_DATE.get_weeks_in_month(new Date(context.calendar_reference_date));

  const calendarDates: IDayInfo[][] = range(0, weeks_in_english_month - 1).map((weekNum: number) => {
    return range(1, 7).map((weekDayNum: number) => {
      return ENGLISH_DATE.get_day_info(weekNum, weekDayNum, context.calendar_reference_date, context.date, context.disable_date_before, context.disable_date_after);
    });
  });

  context.grid_dates = calendarDates;
}
function setMonthYearPanelData(context: any) {
  const now = new Date(context.calendar_reference_date);

  const panel_converted_nepali_date = ADToBS(new Date(context.calendar_reference_date));
  const panel_splited_nepali_date = panel_converted_nepali_date.split("-");

  const year = englishToNepaliNumber(panel_splited_nepali_date[0]);

  const mapped = `${nepaliMonthMap[now.getMonth()]} ${year}`;

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

  const validation_result = validate(today, context.disable_date_before, context.disable_date_after);

  if (validation_result.is_valid) {
    context.date = today;
    context.calendar_reference_date = today;

    event.data?.onChange?.(today);
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
  const validation_result = validate(today, context.disable_date_before, context.disable_date_after);
  context.is_today_valid = validation_result.is_valid;
}

// UTILITIES
export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

export function validate(val: string, disableDateAfter: string, disableDateBefore: string) {
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
      message: "This date is out of range",
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
