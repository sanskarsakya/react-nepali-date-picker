import dayjs from "dayjs";
import { createMachine } from "xstate";
import { ENGLISH_DATE, ENGLISH_MONTHS, IDayInfo, range, stitch_date } from "../../components/nepali-date-picker/components/nepali-date-picker copy/calendar-engine";
import { englishToNepaliNumber } from "nepali-number";
import { ADToBS } from "bikram-sambat-js";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbMA7CqBOABAAoCWAxgNZh4DEA9lgPq4AuYjJWADgK4sDaABgC6iUFzqwSLEgzEgAHogAsAJgA0IAJ6IAjAFYAbADpBADkGDVa5QE5DhgOz6AzAF83mtJhz5i5KjxjEghMei5sRjIMbFw8IVEkEAkpGTkkpQRVR1VjM307fN1HRzNDW0dDTR0EXVVVfWMK5TNHZUdbW3b3TxBvWL9SSmpjaJ84xgAjOggtRjoIrEh6Jjo+KQh2MnQAhPkU6VkseUzdO1tjXTP7F10zFxyXM2rECpNbQRds0t0HVrMPF4Yr5CENAqNgRNprN5otIMZcHMAG4kMAAd0YAFsZmAVowlgoWFiGCwABZRHaUPZJA5pY4ZRBfEzKYrtWwPCyGXSCfQvBBmWyNdqWcofbmGQSOQF9SGDAIjMYDPBTGZzBbYeGIxgo9HEzZ4glErRgfAU3YifaSQ7pUCZFwuZR5FydCpmZT6My6ey87SIRx3YwdTp2RzOh2faX9EH+YZBRUglUw9VLCAI1DI1EY7H6hiMLh4MAotawRjG03bc2JcRWuknRle4z6BqWbnOhqGN18gq5Oqde5lNTlSOy0HyuMjxNquGprU6rM4g1gQnMMDRTZmqkWmk1o51hBfFyXEr6K7FVS2Aw+mp2XR5VSWFqqe5PwzD8Zy2MQ9-K6FTjUz9NtUzPVcVzfNC1kHgS02NctkpChqWrVJdwZfdJTyApbCKEoyjePllBZRtuU+fRSIFUoXFfXooziGNwXjKFVVhf80wzXVs1AphwKLKDiSwMkNwQrckOtelbXrW9uWbW5lBcHkzj5VRDEdN1LCfApzEsKVqJHOiFQnX9mJTVigPYhdcxYGZAIrTcq2SHcbUUPRzkua5DFue5HmeX1aisRxjFUXQviC51KkcQQqKBb89PHb9JyMzVALnEC8S1WAwEwMg6UQ+zkMc04WguK47Hcu4HlUJ4+RKQ8nntVtj2ySKZWisF9Liwzk0Stj5xzJhsX48lko4wSctpFDxIQD1Gg+Fsn25fRBEFPkujMQNao5CoCnuN8lRir8lXizqAO6lLczLZUhpxEbhNy0S9ymppLEEOpPR5Rar0QCxGmKMwX30C9ZIMHbo1a2KDo66djH6gTLt6viBPSzLspusb8r0HlptFSpFtaJS+Xc1bSPtDtlElT0CmB2jQf2hMIZY87TJ6zjSxNZVEdXZG7NRsSnN80imixiUsJyKofNKXJsntf72SeTptN6LAcXgJIaI-QJLTynnMgAWlFmptdWl0+2yC8yclSm1ZGEJMA1u7ULPR0KhbLTDAaB0+W5e5jHdWS1HtJ9Pm0qLduphjTTplNbdrVCGgufJChPHDykqKrVvdJ6hZJq59At0dPzDn8mKOkzYbAKPxt5h1VvMc4Kq6L13I9yV-LOSwXH0EouQ83O9oLw7IehwbgI48u0dqJTHel3HQz8j7+XMUwzHuK5sZae0e9Dgyi8hhnS9HrXPoWoiWw6VxQ2UVOexCjvlLKf1lA8DwgA */
    context: {
      date: "",
      calendar_reference_date: dayjs().format("YYYY-MM-DD"),
      grid_dates: [],
      show_calendar_body: "",
      panel_year: "",
      panel_month: "",
      disable_date_before: "2023-07-29",
      disable_date_after: "2023-10-29",
      grid_months: ENGLISH_MONTHS,
      grid_years: [],
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

              on_next_decade_click: {
                internal: true,
              },

              on_previous_decade_click: {
                internal: true,
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
            },
          },
          year_view_mode: {
            on: {
              on_year_selection: {
                target: "month_view_mode",
                actions: ["selectYear", "setGridDates"],
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
      events: {} as { type: "on_outside_click" } | { type: "open_calendar" } | { type: "on_today_click" } | { type: "on_next_month_click" } | { type: "on_previous_month_click" } | { type: "on_next_year_click" } | { type: "on_previous_year_click" } | { type: "on_next_decade_click" } | { type: "on_previous_decade_click" } | { type: "on_year_selection" } | { type: "on_month_selection" } | { type: "on_day_selection" } | { type: "on_month_view_mode_click" } | { type: "on_year_view_mode_click" },
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
    },
    services: {},
    guards: {},
    delays: {},
  }
);

// ACTIONS
function setDate(context: any, event: any) {
  console.log(event?.data?.date)
  context.date = event?.data?.date ?? dayjs().format("YYYY-MM-DD");
}
function setCalendarReferenceDate(context: any, event: any) {
  context.calendar_reference_date = dayjs().format("YYYY-MM-DD");
  const validation_result = validate(event?.data?.date, context.disable_date_before, context.disable_date_after);
  console.log({ validation_result });
  if (validation_result.is_valid && event?.data?.date) {
    context.calendar_reference_date = event?.data?.date ?? dayjs().format("YYYY-MM-DD");
  }
}
function setGridDates(context: any, event: any) {
  const weeks_in_english_month = ENGLISH_DATE.get_weeks_in_month(new Date(context.calendar_reference_date));

  const calendarDates: IDayInfo[][] = range(0, weeks_in_english_month - 1).map((weekNum: number) => {
    return range(1, 7).map((weekDayNum: number) => {
      return ENGLISH_DATE.get_day_info(weekNum, weekDayNum, context.calendar_reference_date, context.date, context.disable_date_before, context.disable_date_after);
    });
  });

  context.grid_dates = calendarDates;
}
function setPanelMonth(context: any, event: any) {
  const now = new Date(context.calendar_reference_date);
  context.panel_month = now.getMonth();
}
function setPanelYear(context: any, event: any) {
  const panel_converted_nepali_date = ADToBS(new Date(context.calendar_reference_date));
  const panel_splited_nepali_date = panel_converted_nepali_date.split("-");

  context.panel_year = englishToNepaliNumber(panel_splited_nepali_date[0]);
}
function increment_month(context: any, event: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).add(1, "month").format("YYYY-MM-DD");
}
function decrement_month(context: any, event: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).subtract(1, "month").format("YYYY-MM-DD");
}
function increment_year(context: any, event: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).add(1, "year").format("YYYY-MM-DD");
}
function decrement_year(context: any, event: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).subtract(1, "year").format("YYYY-MM-DD");
}
function setToday(context: any, event: any) {
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

// UTILITIES
export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

function validate(val: string, disableDateAfter: string, disableDateBefore: string) {
  console.log("asd", val);
  const is_date_format_valid = dateFormat.test(val);
  if (!is_date_format_valid) {
    return {
      message: "Invalid format",
      is_valid: false,
    };
  }

  const is_date_valid = dayjs(val, "YYYY-MM-DD").isValid();
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
