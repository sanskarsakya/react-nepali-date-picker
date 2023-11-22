import dayjs from "dayjs";
import { createMachine } from "xstate";
import { ENGLISH_DATE, ENGLISH_MONTHS, IDayInfo, NEPALI_DATE, englishMonthMap, months, nepaliMonthMap, parse_date, range, stitch_date, weeks } from "..//calendar-engine";

import { ADToBS, BSToAD } from "bikram-sambat-js";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "nepali-number";

export const mergedMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFswCcYQPrIIYGMALASwDswBiAe1KwAc0q7YsjdSYBtABgF1FQdKrGIAXYjQEgAHogAsAJgA0IAJ6IAjAGYtCgHTcA7AFZuprQA45GiwDY5AXwcrUGSDgIly1WgyYs2DjBODX4kECERcUlw2QRFFXUEBStbPTljU1tbQxTc4ycXdEwPIjIwPWIIABtKGhwqAFdSUR4wwWExCVIpOK1FPQ0Nbm4FAE4LOy0xwy1EzQz9WZHTRW4MjMKQVxK8MvJKmrraZCaWkPaIzuie2MR+-SGR8cnbadn55LGcweHubMM9jGYwUti2O3cey8FXIdFw1WIh1q1DoYFo+HhaIguDQbSkkS6MVAcVsNkGIzMwI0CmMFl0nw0pj0Ywp6zGcm4Yw0OXBxUhnnKelh8MRAGFMaRsWgAAQABWI+AA1ug9NjVFgAG7EMAAdwaEGOWHI0lEDRahFYCKVePCBJuvUQtmMWnJKypNLpyjUmm4WjSWg0hgsY2MclsCg5xkMvLc2ChguFCL04tqkpxcoVyrQqtw6q1uv1huNptUYBxlszNo6UW6DoQTpdf0pXI99O9CAsxjGensQcM2jkAepMd2AoOibFEqlGaVKrVmu1etOBp89DQYC1TRYpfL+CtiqrVxrRJkjudrub1NpbaStgs+hmQZZikMIIU0ec2z5cbHMLAcKTFMsXTeVZ2zed8yXKgV3qBgNwkRoWFOc0K2tPh8WuWs7nrc8my7Ftry9JIsj0LQjBZENqVmfotBHfl9j-ADJ1TadQKzHM80XQtVx3NAFwLZcwFQg90NtTCTziMYdD0BQtFMQN1lfIw5nbYY-WZOw707b4FG4Ts6J-BihX-EVkynEDMznXN+KgmCThoUQLUgwthMPO0sOJRApJdWT5MMRSWQ+dt+w0AxgWBIwI0sD8iljUpoWMpizJYiywI4mzuPqedYDAWp8BuNzxNuTzkkivQrDkEMMlsdY-UMBluUMcqnXI+wcmDMFPwhQyEonZLgJlNirM4gToMNJpRBEA1XNE6tCWK09SvDcq5Eq0NjBqwcck+dluHKzszHfUN-N0Az4oTEzAPMwbLPA6znME1dRGg6y90rWaj3mutdNyFa1uq2rtvbKlBhDMxMnfNaLDO+Nx0u5iBpndjeIyx76mLLADQxaa3rQy53IkzRdLkAxFGdFJjoUFIdvfcqTBGDQqVJHQYd-RLTKAtMbrSlGHrG1c4M3RDMbAbGhNxkT8aKushhBFbTCp-tpl9FSkjpUKTEqwKaqdSrWaMvrOdY269F5ri0doFGcrygqPoJha4g0OQ7HSMj1jkWZDEMZ3bAZZ5SLZCxAVk4ZGX13r4f6rmkZVZDHNR-nYPXIXtzLPiJcK48Hc0Ew0g2qHsg6ukdsqgxuFD2Twy5f5w4upKjdS9i46c83E9oDGUYzu3pewwMfjDGltGMJ37G5T5O30SZhnvbRvg96Guu-c64fr66Y+zZuE7ss14+t0XbalrOZZ912RlWz3vbsT5Kr2qStZmDldJBTrYtHIy0SgBFYEIJE6lRdFrqZy+thN4oUbAjC0ICKwowNAMjeN2Cm7ty5+mfrXA4H8v4-wbtzdiEFW7bwxpvLuh9gElWyGkKSIwap3yVrA9sNImS2BmMCawvY7xoIqBg4g38o7GzSng0aBCwAmiwJ3fcQD7QgOyMyN21D+i0M+LJb2Bh3yTD9JA0EoYOF6C4Tw7B690p823oLBCqddziO7kfKRFDZGcnkdoOhSQFCMyanJV8GRn42G0borBa8hp3RGrZQ0Jitw7wtMQjCViyHSPAb6KBj9HGIF0rpHsQc6TOgmO1bxHBMG8MbsNLehpN5GPFhYkhkiSogiassVqwYIpyEUVTYw6QLDINBGRTs-Rsmf24b4lKOCCklNXNlXK+9ugSI8otXSRgDD+SMBtV8IY-SKLvPoCMphwa6FmJsRecVYacJyb0vJAyAmFNXBNKapT3rlMmY7YETUjAjFzos50vt6EZGaaCZ2b5dCDhmN03J+j-GGPwYaZ684IliSiVMp5synkLOBK8xRphmlRm+Rs4wskFAAqOUCk2Aigk8TToUmaNzCYICqXoGpr47zhXWMi4epFC7lyYcCSwL8vx7LZj445BizaCKLMI00WNcA4zKZE0hi1ZYWD0M6EwmLxjvnLsYRRq01mZCdpYCYekcV6L8SbflhKk7wVCSKsV1yJUVKlTYVxHI9LOkyJk1WST+hpCHtoUEORqRh12W-BKPK8U82JUM+oVtRn5XGZYyVjswx7XvMPYYuRyKZGRdyVJw9cjURyDSXVfTEbAuKaCgWydTGiOJZCuaVrHb9jjSYZxig5Kjwae8t4pELBDCeE6d8KRc28oLQ5FuArVwd3LeKqF0ac7OKpa0x5aL2SM0UXVGSpJOQTBopq3tgam4DrOfUTee8I00AmeSkecbB6Jp+iGFV9CVikUZODWSqRZhOE-KQMa8BwjdWXmAS1tzEAAFo3lJH-f5ZkGz+wpBnZyGKnK-WCiqLUX95KEj0O+GAswvoMgUnvNoicSHs4IEyE1PC7pCJwNlRSYYrL20Q1w5HBDP7x1VpdVGDSZ9tB6WUs2pI1JBzMm5JVUOox-KOF9fRCOq9+nr3w3WGqzSSMEU9Mi-QmQNmVS9jYRYdHJP5vxfdUFMmQHAlIvTdR1hAThgZM4pqExXyM1pNyYE2mOb6qDeWEphmSrUlBDJNkOk-mqL9ikZkYMPVNP7DBr9+z2ZXSk-2lCHmmN-oQIGGYPZIbhkxZAmY16eMYcGM40YckpJ2DGLmzzi0ox7ViZAu8CSGSrH2ii9kORoO0TEz1QUPKGMVbiIrR40z3zasHIORRJgZXjBajod2EZN2uazL1x0ZIavxJgQyb2t87WrT83JubcW9OBMLIthAJ1BiZY2qGCeQMnGzH0HVKSNraSYsi0vaLAb5sqkNUdpLJ6qahTku0577JnbcaSaGF0kDh4avGL6Kwe3dNpULQK47gZrDlTBkw7SjM7zIvsBRoYVNJshxfQ4IAA */
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
              open_calendar: "Calendar Picker",
            },
          },

          "Calendar Picker": {
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
                },
              },
            },

            initial: "day_view_mode",
          },
        },

        initial: "idle",
        entry: "np_mountSetup"
      },

      english: {
        states: {
          idle: {
            on: {
              open_calendar: "Calendar Picker",
            },
          },

          "Calendar Picker": {
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
                },
              },
            },

            initial: "day_view_mode",
          },
        },

        initial: "idle",
        entry: "mountSetup"
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
function np_mountSetup (context: any, event: any) {
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
