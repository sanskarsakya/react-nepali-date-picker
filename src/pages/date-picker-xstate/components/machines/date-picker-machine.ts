import { ADToBS } from "bikram-sambat-js";
import dayjs from "dayjs";
import { englishToNepaliNumber } from "nepali-number";
import { createMachine } from "xstate";
import { ENGLISH_DATE, ENGLISH_MONTHS, IDayInfo, nepaliMonthMap, range, stitch_date } from "../../../../components/nepali-date-picker/components/nepali-date-picker copy/calendar-engine";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbMA7CqBOABAAoCWAxgNZh4DEA9lgPq4AuYjJWADgK4sDaABgC6iUFzqwSLEgzEgAHogAsAJgA0IAJ6IAHAE4AbADoAjId3Ldg5QGZlAdgCszgL6vNaTDnzFyVPGMSCEx6LmxGMgxsXDwhUSQQCSkZOUSlBFUHVWNdJydBVVV9bIdTWydNHQRTQX1bYzV7J0NbWxtTB113T2ifQlJKamMo71jGACM6CC1GOnCsSHomOj4pCHYydH94+WTpWSx5DPMnU0blM8uy1TtlKsR9J11G1WbW9uVO-R6QLxjfIMAiM+uMpjM5gtIMZcLMAG4kMAAd0YAFtpmBloxFgoWGiGCwABaRbaUXaJfapI7pRC2VTnQz5QqmL5lcpvB4IBwOfS5AqCXSmXQOQRtYW-f79PxDQKjAF4SbTWbzbDQ2GMBHI-EbLE4vFaMD4Ek7ER7SQHNKgDJtc5OfS3AyCuqqXS6TmGUVmay1VrChyXUwS0GA-zDOX9RUQlWLCAw1DwxEo9E6hiMLh4MAI1awRgGo1bE0JcTmqnHWnmYxZZymVSCUydT73bQqVQmM6CQROWyM-36QStINjEMykFDhXg5VQ2PqzVJjFY9OZ2Q8HPorBE41k00UkuHMsIdoOPkFIolLLlSrNzLKXmWDsd+3ZbvlQfy6XA8NgpWQ1XT+MaxNtUxVMWGmf8Cy3Iskl3S1FEQU5zmUANrhrOxbAcTlrBeD17FaQxa1MfRLlfKUgTDYNx2-aM1X-WcgKxdVYDATAyCpclixSPcaRqQwvguK4XFQtoMKvVpznqexXXKBwPTqEjYnfcix0jSdfzjBMtWTYCmDXDc6K0zcKHY6DONgjIXF5ZRO3vWxdFbfsROqCwnGMUUhQFax0KcN55OHD8KJUn8Y3UgDNPnVM8wVfSMUM4zKS4q1EAsxprI7Wz7MMRy9ArVtLEZFxXR5ZRfIGUNZQCicguhXTiWilMdIJYkmJYtjtw4i1qUShBWhcwoChFV19HrN0rxaHJ+3cl1DFqFxDBKxTyuUyrqNjGrQrnerc0NKLAIMiCjLakyOv3Wo+0rWp6xcWsu0ud0nmMab7H9OyHHsAV5rIxb5UClbjDWurtOxMBcS2-NSQOqD4rMvQb2Me0O0cQwPSRojOWeEw7KFIV6haWpbA+srR2+5apz+xr1vo1NFyzFdQYVfa4pgzq4IQXRbF5OsCnZgpeK7Tkb0EYwRU6Kw8cZJCCZHT8jRJtTIoprSsXl5qwFYw5GdM5mThZFzBTONojDyL4m2qK6HruCxXWUXj8Ml-ylqo0n5YB3VgbxDYog2WLDqhrX4PsZQzFm6xniIr40bZxon30PJTG8u1ug8P4KIWomI1l4Lnd28KmGp5ccw91AvYZn2mZOtociMOs+2yOs3lMfnhWMCo3iyCw2lFIj3CTrAMXgRJJQUz6zU1-cAFpDE5cSiKeL4XXPAohTt4ZgkwEfju4oVrGbp5OzuPIDBNx4zkaSwkPqEpRW5ZevvTx3f3X0tuNUO1j0KYpSgvTDLPP62WjPOuN805fijKTGc2cNiPwSizAOuR0JWCMPPOoR8ED1EDplOs5gjBWWkkA6WlFQFqX+hAsAUDoasxFK5CoPo7LWH7Pod0TciLuRZJYeOgYk6Dz8kpYm99M7bQVhiMhfsajdhMGeTKPJbAsg7JeJylhjB2luIYNB2Q46J3cEAA */
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
                actions: ["increment_month", "setGridDates", "setMonthYearPanelData"],
              },

              on_next_year_click: {
                actions: ["increment_year", "setMonthYearPanelData", "setGridDates"],
              },

              on_previous_year_click: {
                actions: ["decrement_year", "setMonthYearPanelData", "setGridDates"],
              },

              on_previous_month_click: {
                actions: ["decrement_month", "setGridDates", "setMonthYearPanelData"],
              },

              on_today_click: {
                target: "#Calendar Picker.idle",
                actions: ["setToday", "setGridDates", "setMonthYearPanelData"],
              },

              on_day_selection: {
                actions: ["setDate", "setCalendarReferenceDate", "setGridDates", "setMonthYearPanelData"],
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

        entry: ["setGridDates", "setMonthYearPanelData"],
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
        actions: ["setDate", "setCalendarReferenceDate", "setMonthYearPanelData", "setGridDates"],
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
  // const validation_result = validate(working_date, context.disable_date_before, context.disable_date_after);
  // if (validation_result.is_valid) {
  //   if (working_date) {
  //     context.date = working_date ?? dayjs().format("YYYY-MM-DD");
  //   }
  // } else {
  //   context.date = ""
  // }
}

function setCalendarReferenceDate(context: any, event: any) {
  context.calendar_reference_date = dayjs().format("YYYY-MM-DD");

  const working_date = event?.data?.date;

  const validation_result = validate(working_date, context.disable_date_before, context.disable_date_after);

  if (validation_result.is_valid) {
    if (working_date) {
      context.calendar_reference_date = working_date ?? dayjs().format("YYYY-MM-DD");
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
  context.date = today;
  context.calendar_reference_date = today;

  event.data?.onChange?.(today);
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
