import dayjs from "dayjs";
import { createMachine } from "xstate";
import { ENGLISH_DATE, ENGLISH_MONTHS, IDayInfo, NEPALI_DATE, englishMonthMap, months, nepaliMonthMap, parse_date, range, stitch_date, weeks } from "..//calendar-engine";

import { ADToBS, BSToAD } from "bikram-sambat-js";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "nepali-number";

export const mergedMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFswCcYQPrIIYGMALASwDswBiAe1KwAc0q7YsjdSYBtABgF1FQdKrGIAXYjQEgAHogC0AJm4BGAHQA2AOwBObZuXaALAGZDy7uoA0IAJ6Jj246uWaArMoAcCw1o+fX6gC+gdaoGJA4BCTk1LQMTCxsHGCcyvxIIEIi4pIZsghyhkqqZrpeLu7qKla2iOYKTsbKrtwKBgra3i7BoeiYkURkYKrEEAA2lDQ4VACupKI86YLCYhKkUvncqka67grqHtrKysaamgrWdgiOW4aahtquCq7GDn49IGH9eIPkI+OTWjIWbzVJLTIrHLrPKITROZplbhudSeNzKS51PzaVRPB7aPynY4eVwfL4RH7RYbkOi4MbEWJYCC4URgLBkOgzBZ8KRZVa5UD5KqGVT7bhiw5HZQ+DwYhDKBT6EXqFoNbgPbiODykvrkqJDVTU2nEf4Tah0MC0fC0i1MtCLHmQtYbRD4xpaCzKLTyg6uWVS1o4opuJSuSoeQza8LYCn6w101RWiakW1YABGVAgNiwTAtkFUTKzADdiGAAO7TCCArDkaSiabzQisOn4ADW9oyvKhzoQmnU6lUrzFnql7i8vtqcqR-eOCg8fbcOjnmkj3z1fzjxsTNtwaDTGazOfIEHzuCLJfLwMrDJrdZsYB3TeIrfby2yTphPb7A+MQ5RhlHzyyhKJRFMSxiuEc+KaFqISfDq0ZrlSYA0vGW7Jg+6aZtm5pHieZ5lhWVYMGAxazCwd4PvgzZttyHaOvyMiwl+g7VCOniARO5wKKoZyzoYarPPinQrrqvxIShm7Wuhu6YQeOF5gWWDFgRl5EWgJESDMLDAg2j7PrRr58tCApMf2LHDv+7Hjlcrg+M4rReOcEG6GqIkIWJBrIUaCZSSmsnYbmx6KcpF4ZlWFG7iFhF6TR4Kdu+JmTnZPgtAEarup6fpTjxfg+mchwnAobkDJSnkST5SZ+fuAW4cF56EQyOmiI2UWqTFL4Qm+DH5OYyXKtwaU+Jo1Sym4WyHC0JzHDorg6MVMbrl5qG+Rh1WHgpp5KfVqkMopsBgBM+BQh18XdYgbRzqoSLuJ6Gq2fshh+komgaFUrQuG0+zCbBZLuaVG4VduMlrfJQWba1YUMrMogiJW7UGZ1Rndm0vZXWit2PEU6iPRO+JbAcYpIt4s76BGP3wSVsZLZJlWrVh61g-hoVXlMogZptVFPrFDpdcZjEIBd-bXccVSYw9WU-ts2iE8SoYKq55NRpTi3lWhVX06DqgRVtKmQ1MN6MmAVpw5z+lxfRfM9U0L0Ks8fizrOBgyrjWgaMN1TGB4w2mGTvRKwt4neWrdNyYFWv3pF2163E6mkVphvG6ypvc3RvPdicFhoy0+gvHiCpAYqoZDqc9zNPc82IWVQcrcDGth9rEMs7Q2v7Ydx0I6dlt1M5r1ijc5w6GcWVFPZv5vScpgVx5APB7Xoe4U1LVR039Cx5p5ER-D5tpx+njqNiM31P+Wie5osr4h4PHaFUnoBEY6hNFP-3U4D0l7nXC80M1OvM1WBva8nE6Ft04eA8PjToN8nie2ltZRAhxuJaBvg4AIrhiQwT9quaeL9Z7v3nnmReP8GpTAIa3I27dt5I13j3PsfcfwDz0GfCcLwthwkJn2A4ug3BPypqrGuuCar4K-kvXWK8G7LyTtRIBO9EoIn7EYSanRr4NACEBL2PEaGlGVGA3Q3C-gWigHSWAhBdrMlZOyTkUjKGJRMJfFi3BDgPGGvI2U+wFDcVnC0f8ntnj7GXIrTBpV9GGMICaSYOFWA10sV2D8vgBxgKJgcRJpwXHhjMtLdK+huDgROLo4YQTiBGNfurPBjNCE7X1mAWs9Zv6AI7sAj8pNnA-gScSL0NQrjPCyTxU4hw1TtEML7OC-tK75MKTg-yDM8JlOjtWSpt5N61IodExKjSM4tICPodp51jAKiur4XiLxvABFyaoUZITxkgzDnVERakNJkSwAAyRdTpH81Wc084Po2kuOaFsBw0Fsb2POHcE5ZyikhwEaUxuty47aSEVvHmVjXknDiWKD5c45zJInAYOEPEFTEg1J9QwHhjAgo4MEsFc8IVTKhY1OFUL4Wp0RfkPQwobjXU9tjM4WyBYuEvk8MUxgtA6DaCSfxolAlkoKecvhEzNbXN-iYrMpCjprCiQlfmIZhTyylMqFwOzGEdIfq4EU+KvFjn2KSgxUqKX8MmfKohtBoawwkVzNVZ0BZqi1cNHV7g4T5wnN4exA4BpZI1H02clryUXI-htJmDqsBs0UoshFyyNUDS9SoFKer-UdP-JfFELQdltGVAqPxGDxX6lBdGkp1LxEMjETchlhlU3MvuNsd5Lw5x3F7C4zxJQLBOIGSoYaZahkBMrZKsZMrLm4QbQqipVTKyJybYjFtdQjndN7Mo8wZxHguOQSKR4aoxREo6EVMVf0J1WqnbTSlky53xuIjChOuATZPKWeqnqDRhS2RUG0Bw36DXnQ6NiCoWT7jgTMMCi9ys8mTulbe21msH3lObpvZV5CU2fu7kG1o7hBVoNQSYFxPgD6dP4vsE4RxI3WurVSghNKphPvXg8hZ76sPuoqJfYWyCqioNnCRz0JQ2jHtVOcZQNGb1AyQ2HBjdaF3zMouxxla65S9kvnjE4xK3G2WVPu4oP5zCnBRNBEwQQYMB1OfBm1srZN0vk0COFGHVXPKZTh7jzwTg+jQcRrFjxbFFx-IOZ4-5JMIek7Zz+ulGNoYfPS5NKnsNyl-QOHxbjdWoiAwLTzA5pZQRcH2IwwRYKkDCvADIv1YMca7gUaUJQDD4hRpUEaWKXAlBaFktx-58TQfLZev4owJjVe7HIaaPFbJ6AGuk+UQ8mFGB4vca+k3CREpORuYbH5Qz9lFOKXQxxpQuLVNsQmOz75uMzWtl+g2wAbcSqW-sg9saFvUEcrLO7jV6FsjoT0PpPaXd4YhyLkBbtItsc0iyAFYEC06AODrTRdDYztv96ugOZ2xumZWEH+R7YaBDRUT7GpjBPVmjlEmugGj4lDMj5aqOY3HhQ2FLHdRXjYhMNnPQKMdVZQOFfIcEo9uempzTCLaPjxyZuUzuURxxqzSqBTqU+hnZXHMIcbYt0DDsUnhZkZ8HJcOF+c0+xOxB1Q89DsnE3gvZmBeN49BY6K16Os9dyXDQDCpczZ0AwOyni9qE10Hw2MhrS3M312DVnr3hbfkDiAku+zGs9qi-Y6KH5vf0NiFlF8lEP3lGFmzova0S8S+6saA4XuzSRJNnN50fT9p0Fk1BuISXa48lW6ddPw5xfEZL70fKnhl6OBBLrJHr71c8fsFEnptC57o5M8Xv9u-QWxHdLzzQTADPRAG31gZep8XAviYrgQgA */
    id: "merged_machine",
    context: {
      date: "",
      isNepali: false,
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
              target: "nepali",
              cond: "isNepali",
              actions: "np_mountSetup"
            },
            {
              target: "english",
              actions: "mountSetup"
            },
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
            entry: ["np_setCalendarReferenceDate", "np_setGridDates", "np_setMonthYearPanelData", "np_setIsTodayValid", "np_setCalendarControllerLabels"],

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

                  on_year_view_mode_click: "year_view_mode",
                },
              },
            },

            initial: "day_view_mode",
          },
        },

        initial: "idle",

        on: {
          on_date_input: {
            target: ".calendar_body_opened",
            actions: ["np_setDate", "np_setCalendarReferenceDate", "np_setMonthYearPanelData", "np_setGridDates", "np_setCalendarControllerLabels"],
          },
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
            entry: ["setCalendarReferenceDate", "setGridDates", "setMonthYearPanelData", "setIsTodayValid", "setCalendarControllerLabels"],

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

                  on_year_view_mode_click: "year_view_mode",
                },
              },
            },

            initial: "day_view_mode",
          },
        },

        initial: "idle",

        on: {
          on_date_input: {
            target: ".calendar_body_opened",
            actions: ["setDate", "setCalendarReferenceDate", "setMonthYearPanelData", "setGridDates", "setCalendarControllerLabels"],
          },
        }
      },
    },

    on: {
      on_props_change: [
        {
          target: ".nepali",
          cond: "isNepali",
          actions: ["np_propsChange"]
        },
        {
          target: ".english",
          actions: ["propsChange"]
        },
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

      // common
      propsChange,
      np_propsChange,
    },
  }
);

// GUARDS
function isNepali(context: any, event: any) {
  return event?.data?.isNepali;
}

// ACTIONS
function propsChange(context:any, event:any) {
  console.log("eng props change")
  let newDate = context.date
  
  if(context.isNepali !== event?.data?.isNepali && context.date) {
    newDate = BSToAD(context.date);
  }
  if(context.date !== event?.data?.date) {
    newDate = event?.data?.date;
  }

  context.date = newDate
  context.isNepali = false
}
function np_propsChange(context:any, event:any) {
  console.log("eng props change")
  let newDate = context.date
  
  if(context.isNepali !== event?.data?.isNepali && context.date) {
    newDate = ADToBS(context.date);
  }
  if(context.date !== event?.data?.date) {
    newDate = event?.data?.date;
  }

  context.date = newDate
  context.isNepali = false
}

function mountSetup(context: any, event: any) {
  context.grid_months = ENGLISH_MONTHS;
  console.log("eng mount setup", event?.data);
  
  let newDate = context.date
  
  if(context.date !== event?.data?.date) {
    newDate = event?.data?.date;
  }

  context.date = newDate
  context.isNepali = false

}
function np_mountSetup(context: any, event: any) {
  console.log("np mount setup", event?.data);
  context.grid_months = months.ne;

  let newDate = context.date
  
  if(context.date !== event?.data?.date) {
    newDate = event?.data?.date;
  }

  context.date = newDate
  context.isNepali = true
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
  console.log("en_date_input");
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
