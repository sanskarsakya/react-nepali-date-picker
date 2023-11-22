import dayjs from "dayjs";
import { createMachine } from "xstate";
import { ENGLISH_DATE, ENGLISH_MONTHS, IDayInfo, NEPALI_DATE, englishMonthMap, months, nepaliMonthMap, parse_date, range, stitch_date, weeks } from "..//calendar-engine";

import { ADToBS, BSToAD } from "bikram-sambat-js";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "nepali-number";

export const mergedMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFswCcYQPrIIYGMALASwDswBiAe1KwAc0q7YsjdSYBtABgF1FQdKrGIAXYjQEgAHogAsAJgA0IAJ6IAjAHYAnADoAbAFYj3M0Y0mAzAq0KAvvZWoMkHARLlqtBkxZsOME4NfiQQIRFxSTDZBEUVdQQFBQAOPW45U24rAwMFbJTuFMdndEx3IjIwPWIIABtKGhwqAFdSUR5QwWExCVIpWKs5bj0NHTNuMZ0dBSsTAwTEBWm9OYn8lJStFKM5EpAXcrxK8hr6xtpkVvbgrvCeqP6YzQMNUcKJjTktIys5lMWCG0CgMeh0P24CiMEIytn2hzcx081XIdFwdWI3iwEFwojAWDIdBaHT4UgivWioFiBgyehBExS0w0XwMALUmlsbxBplmGXGOisxScBzKiI8VT0qPRxDODWodDAtHw6MVOLQnTJDz6A0QOhSVlWBi03FeRo0IJ2gK+kL0u1sRnyJg0rL2woR2CREqlGL0yoapDVWAARlQIKosExFZA9DjwwA3YhgADuzQgFyw5Gkoma7UIrAx+AA1hqwuTHjqEFpcqsrGZnV8LCkoVbuFXRuaUrkfrpO1p4aKPeLTt6ZX7Vbg0MHQ+HI+QIDHcPHEymrmmsZns6owBP88QiyXupFtc9K9W-nXXpkNE2jIDGfo5IodnMdGMtkLSq5BycUWA0T6xwDHcQzDCMFTnBcl2TVN0wYMAE1aFgtx3fAC2LUlSy1SkZEQKtQXPSZL0bZt2UrZI9C0OwUmGRQjD1GZ+y-CpkUlP9pV9FUgMnECZ3A6NYywBNoNXWC0HgiQWhYK5c13fcMMPCknipXCz1rQiG2vEjEl2UENEhJs7Do6YMkYo4h1-f9R04wMeLAqN5wEoSV1DdNkMnJyYNk9C7jLY9lKBDJQTkYxuCMGlguNZ0WzbbZnR2SjGQ0GxTLFH9WMsjj-Rs6c7IgxzlxgrFpNEPMPJEryD3uI9sNiPTgr0YLTDCwLIoWUiIT0RlTCS5ldGhHQUu-FiR0y8duJy2d+MXQSCpErEBNgMAGnwR5Kt8mqlmvUFWwsZ1uB0O0DDkK18i0QwaUhYFzQMBi3QHZivTYgDrOAia+Ic6aypcrFWlEEQ0wq+SqsUisFG0bafmZGkDsUI7AT1EZWQmOwny0L5Boe4cnqsrLXtAyaPqg5y1yaURQ2m1C928zVqqUnCki29JIb2mGQWO0i9NrMFxjMHYTFsEy7qYz0sYywDsvx969DcmbhO+poN2xMBlQBym5J8rC6dqqxtDpQyUg7VI33ho1DGNQjBWNIZXU-My0pG8W8d4+zpe3dzZvlnwxIQySlZV-E1epzDaYrJKTSZ0w0d+ORplsO80dtLIksouRLC0G2RWF8z0vYx3xsll2Za+knaBlxbltWoH1q1zQjPOswBVbWxwS0FtFFGT5cjrP4M-dTGLNzl78+diDitKj2S-ob2JKQt3AY1kOTy2-Q+r0hRMiNS34c2CidBpZ0wp0YKdYxkWB+e3Hh9y6Mx9l4n00VmXA7WzXQ82RGZn3h1BXGW9SMZBQZt95WAOsYHYH5M522GtjUaXEpwF1HjQEqd9CpNFvuXZWlcF4gyXnXLu+1ax2F0JRQEvwRhaDUiaXI94fin2zoqKAGJYCEHmrifEhJiQv0Xv5OQgoawMiPuCfamRAQgnIqkUwmRBRQhBH2IWUCJQMKYYQWUjRwKsCHlwnB-kjRpEFGYOwrIjFWFbqRVI9UQFmAipzCwVg6FpSUcQZhsCJYjymkTVBtBFa32flXV+J40ZyFGGpQxOwzRtUSFCbIFETGMgyGMdevd7pnz0I45xed4FuMJiguaCswBZiwE-NCWjywBK+MEgxFowpowiUsGwZ0TTbEolCGwG97EsTSSojJtkCaQRyZ7Ke4lEKFLnr47BpT-KBIqU3Vk1SopmMsCMEB2wjpFBRnI22qUOkcGUS4p219snF1EkM32Pjil+O4fTNGBp9EzM7J2ExVpwQGiITsfaYN176naYonZTiulD0yQcvpRyipIPHnLVW5zxl+XpuCIJjcdqCiOpRWpDNti2nyNkI0ugwZGG+acTpeyr69PyhC9MC0lqYL6CUmFsRHRBIFiyCwFC45mIMHMOkbypE3hBPi6ohLulvRdqS++P1iT-QDlCmm2j6b5EfHrSYjVtD1NEcMPRoVsj7XiakPlqTfnpIBT0qWIrPFYDJgJMZ0qJmytCgyyKSqWWmMiZkNIrxTA2DBsYWwGzIFbJ+Ywv5RLAUks+hPVyc8jnzytbS3U6cwQhN+J2b4VZRGSIao04RwxtCtl1QKw1QqIJFzDeufJ2Y0z+yjcHGVtV15GBiVWWYFhWx9VESAutyxJFWKbLdTZQ1-W7MFQg6MRayVYjgj7Fg5bcCQqpjSjaQJZhBN2JMMGIDF1OqWMsfQ2h3XpzmKnb4ub9X-MvsGqWI7RVNDLpSla1KLnVtrkUdIUIkqzPAbw1VN0KJROGCCJKr4j0BoNaeo1Ltb4gqaOOmeIyUJSqrda2qPw0g7X-c1IwTY2TOudA1MGGRISELBoBgd+ah3znA8WvJBSimzvvQhzQVY0gIySvqZIOk-6RJsEsyY2QqzaGojkIjgbB1ZL0OR0daCwVYAwbemgc6a5AlMMhl9ORwHoY-RzA6eiTCavPFCTIgngNjTPWByTEHS4RrDZWhSdGFPDFWDI5IxhmRbA3UkF9qx+RbHBjdJJWd7YwOE0CsTl7zM7kjZa+DMaFN7zBJkSYMw96NtRZsM6eF4l73Q-tAa+xSAuXgGEPuZ9o3zoALSoq-cMHkgphjsuWL5hRpxagNGK-J+IpFaztsWdkc0dWxi6pHC1is8w6QXSKEyFkmHa4NI+BaFpdE8j9ZgU1sAg2TzetBMQo67q8iZFc3pH4YIfjfFfNQxNi2xYkayatyZ15+HqSvDeURr543I25L8SR53B4gYLe4-paZrv0wNoAmk3UfjglMAKE60IKIYd0DMEBfNPsXyM6BwtFmyUA+1iAhqaxiFg0CaivSrJd51nvONgwSOcYo5+2R0zYbMeaFfCMeKNJZivm+NeFsjIwR7TGJpIYBnCAM4QJYu7Y2Y7GiPux2u1EKJ8h7IUI0B1BeqOF7MMY9nFUzDGDYB0qbsPrxZEdCK4wKfyL9QS49QbUeQGF7kOttzQnGL22jfQJh3XvKV4R83fbLdAZPdT0jwL6eRfnR1HIUJjTEMhK5qp6bdDZHQw6XhKvAu9IvTBYX100j8zyHRSwMx16qpi6nSRIJXjOmy72-uer-fW5p6JunGPQ-yb4-ofati3W8MfBofXZ1dh1XMS+IUjggA */
    id: "merged_machine",
    context: {
      date: "",
      calendar_reference_date: dayjs().format("YYYY-MM-DD"),
      grid_dates: [],
      show_calendar_body: "",
      month_year_panel_data: "",
      disable_date_before: "",
      disable_date_after: "",
      grid_years: [],
      error: "",
      grid_months: ENGLISH_MONTHS,
      is_today_valid: false,
      date_picker_body_data: {
        weeks: weeks["en"],
      },
      is_dark: false,
      calendar_controller_labels: {
        month_label: "",
        year_label: "",
      },
    },
    states: {
      idle: {
        on: {
          on_mount: [
            {
              target: "nepali.idle",
              cond: "isNepali",
            },
            "english.idle",
          ],
        },
      },

      nepali: {
        states: {
          idle: {
            on: {
              open_calendar: "calendar_body_opened",
            },
          },

          calendar_body_opened: {
            entry: [
              "np_setCalendarReferenceDate",
              "np_setGridDates",
              "np_setMonthYearPanelData",
              "np_setIsTodayValid",
              "np_setCalendarControllerLabels"
            ],

            states: {
              day_view_mode: {
                on: {
                  on_next_month_click: {
                    target: "day_view_mode",
                    internal: true,
                    actions: ["np_increment_month", "np_setGridDates", "np_setMonthYearPanelData", "np_setCalendarControllerLabels"],
                  },

                  on_next_year_click: {
                    target: "day_view_mode",
                    internal: true,
                    actions: ["np_increment_year", "np_setMonthYearPanelData", "np_setGridDates", "np_setCalendarControllerLabels"],
                  },

                  on_previous_year_click: {
                    target: "day_view_mode",
                    internal: true,
                    actions: ["np_decrement_year", "np_setMonthYearPanelData", "np_setGridDates", "np_setCalendarControllerLabels"],
                  },

                  on_previous_month_click: {
                    target: "day_view_mode",
                    internal: true,
                    actions: ["np_decrement_month", "np_setGridDates", "np_setMonthYearPanelData", "np_setCalendarControllerLabels"],
                  },

                  on_year_view_mode_click: "year_view_mode",
                  on_month_view_mode_click: "month_view_mode",

                  on_day_selection: {
                    target: "#merged_machine.nepali.idle",
                    actions: ["np_setDate", "np_setCalendarReferenceDate", "np_setGridDates", "np_setMonthYearPanelData", "np_setCalendarControllerLabels"],
                  },

                  on_outside_click: "#merged_machine.nepali.idle",
                  on_today_click: { target: "#merged_machine.nepali.idle", actions: ["np_setToday", "np_setGridDates", "np_setMonthYearPanelData", "np_setCalendarControllerLabels"] },
                },
              },

              year_view_mode: {
                on: {
                  on_next_decade_click: {
                    target: "year_view_mode",
                    internal: true,
                    actions: "np_setYearViewModeNextDecade",
                  },

                  on_previous_decade_click: {
                    target: "year_view_mode",
                    internal: true,
                    actions: "np_setYearViewModePreviousDecade",
                  },

                  on_year_selection: {
                    target: "month_view_mode",
                    actions: ["np_selectYear", "np_setGridDates", "np_setCalendarControllerLabels"],
                  },
                },

                entry: "np_setGridYears",
              },

              month_view_mode: {
                on: {
                  on_previous_year_click: {
                    target: "month_view_mode",
                    internal: true,
                    actions: "np_setPreviousYearForMonthView",
                  },

                  on_next_year_click: {
                    target: "month_view_mode",
                    internal: true,
                    actions: "np_setNextYearForMonthView",
                  },

                  on_month_selection: {
                    target: "day_view_mode",
                    actions: ["np_selectMonth", "np_setGridDates", "np_setCalendarControllerLabels"],
                  },

                  on_year_view_mode_click: "year_view_mode"
                },
              },
            },

            initial: "day_view_mode",
          },
        },

        initial: "idle",
        entry: "np_mountSetup",

        on: {
          on_date_input: {
            target: ".calendar_body_opened",
            actions: [
              "np_setDate",
              "np_setCalendarReferenceDate",
              "np_setMonthYearPanelData",
              "np_setGridDates",
              "np_setCalendarControllerLabels"
            ]
          }
        }
      },

      english: {
        states: {
          idle: {
            on: {
              open_calendar: "calendar_body_opened",
            },
          },

          calendar_body_opened: {
            entry: [
              "setCalendarReferenceDate",
              "setGridDates",
              "setMonthYearPanelData",
              "setIsTodayValid",
              "setCalendarControllerLabels"
            ],

            states: {
              day_view_mode: {
                on: {
                  on_next_month_click: {
                    target: "day_view_mode",
                    internal: true,
                    actions: ["increment_month", "setGridDates", "setMonthYearPanelData", "setCalendarControllerLabels"],
                  },

                  on_next_year_click: {
                    target: "day_view_mode",
                    internal: true,
                    actions: ["increment_year", "setMonthYearPanelData", "setGridDates", "setCalendarControllerLabels"],
                  },

                  on_previous_year_click: {
                    target: "day_view_mode",
                    internal: true,
                    actions: ["decrement_year", "setMonthYearPanelData", "setGridDates", "setCalendarControllerLabels"],
                  },

                  on_previous_month_click: {
                    target: "day_view_mode",
                    internal: true,
                    actions: ["decrement_month", "setGridDates", "setMonthYearPanelData", "setCalendarControllerLabels"],
                  },

                  on_month_view_mode_click: "month_view_mode",
                  on_day_selection: {
                    target: "#merged_machine.english.idle",
                    actions: ["setDate", "setCalendarReferenceDate", "setGridDates", "setMonthYearPanelData", "setCalendarControllerLabels"],
                  },

                  on_outside_click: "#merged_machine.english.idle",

                  on_today_click: {
                    target: "#merged_machine.english.idle",
                    actions: ["setToday", "setGridDates", "setMonthYearPanelData", "setCalendarControllerLabels"],
                  },
                  on_year_view_mode_click: "year_view_mode",
                },
              },

              year_view_mode: {
                on: {
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

                  on_year_selection: {
                    target: "month_view_mode",
                    actions: ["selectYear", "setGridDates", "setCalendarControllerLabels"],
                  },
                },

                entry: "setGridYears",
              },

              month_view_mode: {
                on: {
                  on_previous_year_click: {
                    target: "month_view_mode",
                    internal: true,
                    actions: "setPreviousYearForMonthView",
                  },

                  on_next_year_click: {
                    target: "month_view_mode",
                    internal: true,
                    actions: "setNextYearForMonthView",
                  },

                  on_month_selection: {
                    target: "day_view_mode",
                    actions: ["selectMonth", "setGridDates", "setCalendarControllerLabels"],
                  },

                  on_year_view_mode_click: "year_view_mode"
                },
              },
            },

            initial: "day_view_mode",
          },
        },

        initial: "idle",
        entry: "mountSetup",

        on: {
          on_date_input: {
            target: ".calendar_body_opened",
            actions: [
              "setDate",
              "setCalendarReferenceDate",
              "setMonthYearPanelData",
              "setGridDates",
              "setCalendarControllerLabels"
            ]
          }
        }
      },
    },

    on: {
      on_props_change: [
        {
          target: ".nepali.idle",
          cond: "isNepali",
        },
        ".english.idle",
      ],
    },

    initial: "idle",
  },
  {
    guards: {
      isNepali,
    },
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
      mountSetup,
      en_date_input,
      // NEPALI FUNCTIONS
      np_setDate,
      np_setCalendarReferenceDate,
      np_setGridDates,
      np_setMonthYearPanelData,
      np_increment_month,
      np_decrement_month,
      np_decrement_year,
      np_increment_year,
      np_setToday,
      np_setGridYears,
      np_selectYear,
      np_selectMonth,
      np_setNextYearForMonthView,
      np_setPreviousYearForMonthView,
      np_setYearViewModePreviousDecade,
      np_setYearViewModeNextDecade,
      np_setIsTodayValid,
      np_setCalendarControllerLabels,
      np_setPropsData,
      np_mountSetup,
    },
  }
);

// GUARDS
function isNepali(context: any, event: any) {
  console.log(event.data);
  return event?.data?.isNepali;
}

// ACTIONS
function mountSetup (context: any) {
  context.grid_months = ENGLISH_MONTHS;
  if(context.date) {
    context.date = BSToAD(context.date)
  }
}
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

  if (working_date) {
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
}
function setGridDates(context: any) {
  const weeks_in_english_month = ENGLISH_DATE.get_weeks_in_month(new Date(context.calendar_reference_date));

  const calendarDates: IDayInfo[][] = range(0, weeks_in_english_month - 1).map((weekNum: number) => {
    return range(1, 7).map((weekDayNum: number) => {
      return ENGLISH_DATE.get_day_info(
        //
        weekNum,
        weekDayNum,
        context.calendar_reference_date,
        context.date,
        context.disable_date_before,
        context.disable_date_after
      );
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

function en_date_input() {
  console.log("en_date_input")
}

// UTILITIES
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

// NEPALI FUNCTIONS
function np_mountSetup (context: any) {
  context.grid_months = months.ne;
  if(context.date) {
    context.date = ADToBS(context.date)
  }
}
function np_setDate(context: any, event: any) {
  const working_date = event?.data?.date;
  if (working_date) {
    context.date = working_date ?? dayjs().format("YYYY-MM-DD");

    event?.data?.onChange(working_date ?? dayjs().format("YYYY-MM-DD"));
  }
}

function np_setPropsData(context: any, event: any) {
  const props = event?.data;
  context.date = props?.date ?? "";
  context.disable_date_before = props?.disable_date_before ?? "";
  context.disable_date_after = props?.disable_date_after ?? "";
  context.calendar_reference_date = ADToBS(dayjs().format("YYYY-MM-DD"));
}

export function np_setCalendarControllerLabels(context: any) {
  const splited = context.calendar_reference_date.split("-");
  context.calendar_controller_labels.month_label = months.ne[+splited[1] - 1];
  context.calendar_controller_labels.year_label = englishToNepaliNumber(splited[0]);
}

function np_setCalendarReferenceDate(context: any, event: any) {
  context.calendar_reference_date = ADToBS(dayjs().format("YYYY-MM-DD"));

  let working_date = event?.data?.date;

  if (working_date) {
    const validation_result = validate(BSToAD(working_date), context?.disable_date_before ? BSToAD(context.disable_date_before) : "", context.disable_date_after ? BSToAD(context.disable_date_after) : "");

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

}
function np_setGridDates(context: any) {
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
function np_setMonthYearPanelData(context: any) {
  const now = new Date(context.calendar_reference_date);

  const panel_converted_english_date = BSToAD(context.calendar_reference_date);
  const panel_splited_english_date = panel_converted_english_date.split("-");

  const year = nepaliToEnglishNumber(panel_splited_english_date[0]);

  const mapped = `${englishMonthMap[now.getMonth()]} ${year}`;

  context.month_year_panel_data = mapped;
}

function np_increment_month(context: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).add(1, "month").format("YYYY-MM-DD");
}
function np_decrement_month(context: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).subtract(1, "month").format("YYYY-MM-DD");
}
function np_increment_year(context: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).add(1, "year").format("YYYY-MM-DD");
}
function np_decrement_year(context: any) {
  context.calendar_reference_date = dayjs(context.calendar_reference_date).subtract(1, "year").format("YYYY-MM-DD");
}
function np_setToday(context: any, event: any) {
  const today = dayjs().format("YYYY-MM-DD");

  const today_nepali = ADToBS(today);
  const validation_result = validate(today, context?.disable_date_before ? BSToAD(context.disable_date_before) : "", context?.disable_date_after ? BSToAD(context.disable_date_after) : "");

  if (validation_result.is_valid) {
    context.date = today_nepali;
    context.calendar_reference_date = today_nepali;

    event.data?.onChange?.(today_nepali);
  }
}

function np_setGridYears(context: any) {
  const current_year = +context.calendar_reference_date.split("-")[0];
  const year_grid = get_year_list_in_decade(current_year);
  context.grid_years = [year_grid[0] - 1, ...year_grid, year_grid[year_grid.length - 1] + 1];
}
function np_selectYear(context: any, event: any) {
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

function np_selectMonth(context: any, event: any) {
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
function np_setPreviousYearForMonthView(context: any) {
  const split_date = context.calendar_reference_date.split("-");
  context.calendar_reference_date = stitch_date({
    year: +split_date[0] - 1,
    month: +split_date[1],
    day: +split_date[2],
  });
}

function np_setNextYearForMonthView(context: any) {
  const split_date = context.calendar_reference_date.split("-");
  context.calendar_reference_date = stitch_date({
    year: +split_date[0] + 1,
    month: +split_date[1],
    day: +split_date[2],
  });
}

function np_setYearViewModeNextDecade(context: any) {
  const current_decade_last_year = context.grid_years[context.grid_years.length - 1];
  const year_grid = get_year_list_in_decade(current_decade_last_year);
  context.grid_years = [year_grid[0] - 1, ...year_grid, year_grid[year_grid.length - 1] + 1];
}
function np_setYearViewModePreviousDecade(context: any) {
  const current_decade_last_year = context.grid_years[0];
  const year_grid = get_year_list_in_decade(current_decade_last_year);
  context.grid_years = [year_grid[0] - 1, ...year_grid, year_grid[year_grid.length - 1] + 1];
}

function np_setIsTodayValid(context: any) {
  const today = dayjs().format("YYYY-MM-DD");
  const validation_result = validate(today, context?.disable_date_before ? BSToAD(context.disable_date_before) : "", context?.disable_date_after ? BSToAD(context.disable_date_after) : "");
  context.is_today_valid = validation_result.is_valid;
}

// UTILITIES
export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

export function np_check_if_in_range(value: string, disableDateBefore: string, disableDateAfter: string) {
  if (disableDateBefore && dayjs(value).isBefore(dayjs(disableDateBefore))) {
    return false;
  }

  if (disableDateAfter && dayjs(value).isAfter(dayjs(disableDateAfter))) {
    return false;
  }

  return true;
}

export function np_validate(val: string, disableDateBefore: string, disableDateAfter: string) {
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

export function np_get_year_list_in_decade(current_year: number) {
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
