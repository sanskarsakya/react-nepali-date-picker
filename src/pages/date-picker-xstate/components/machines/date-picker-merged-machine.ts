import dayjs from "dayjs";
import { createMachine } from "xstate";
import { ENGLISH_DATE, ENGLISH_MONTHS, IDayInfo, NEPALI_DATE, englishMonthMap, months, nepaliMonthMap, parse_date, range, stitch_date, weeks } from "..//calendar-engine";

import { ADToBS, BSToAD } from "bikram-sambat-js";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "nepali-number";

export const mergedMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFswCcYQPrIIYGMALASwDswBiAe1KwAc0q7YtiXy7cAbYrI3UjADaABgC6iUHSqxiAF2I1JIAB6IA7ACYAdABYRAVgAcIgGy6Dm9aaMBGAMwAaEAE9EtzQE49RzyK2enra6toH2AL7hzqgYkDgEJOTUtAxMLGxYHNy8-IJgQrYSSCDSsgpKxWoIut6mIqGm9iJh5p6azm7V9gba9Ub2ntbG6iEGBpHR6JjxRGSUNPSMzFgQuHJgfIQCwuLKpfKKpMpVALS2tkba3WOaZuYGtg8GHYiejdqe9rZmmh62jVoJiAYtM8LMkgtUstVutNtt8oU9jIDhVQKdzpdrpY7hZHo8Xghvp5LoZvup+loDH4jECQXEwYkwNpiBAuPNaMgqABXUhyURFKTI8pHSqIEL2bS+QKeXQWPoygkGL7aTReQZUoyaIzqfy0qb0hJzZms9k4bm8goCkpCw7HRDdWzaAx1fxtdQGdRNXSmAkXX69OpGXxU3Saez2dR62LYBlGrI8ZIrNYbMh0Ll83bFfbCu0IUzqbxBwIFnUOf66AlWdRO24iCwjYyWYJR0GG8jaePEY1s6h0MC0fDcfurND8pFlW2ihAykS9TQGfwiLxfKwV1zuJreNqu1UDexBlsG8FMzvaQds0gjrAAIyoEBcWCY-cg2lWD4AbsQwAB3M0QU3kCochmryhB8Dw+AANZjlmNqoqorzunOC46suHgjASQSmCqfgiHY9S1iIERRMC+oxm2J5gJwPBnkOl64GgN53g+T7kBAr64B+X6-py-6JoBwEuGADHgcQUEwYKE7wVU6rIYuaGrgSnq1LWDZ1s0xKHuRx4dlR2S0ReV63vej59mxHFcT+f6mgwYCftyLBCSJ+AQdBmaSSiIpoohPRLihS6fOha6dM6OieAuZgFm8oSfFpMyMrp1Fduew4icZLFmS+b5YJ+Vm8TZaB2YoXIsJyoGieJ7nWlJXkIdOSF+fJgWKeuCD7thWoiGYwRBl4vhxbG7anil9GMelpnPux2W5Txd6mk5jEzdZFVuVa2aTt5hJWD0-xdRpTSks8rVtJc6jfL4JjEpopjmANFGJfpI1GcxE3mdN3HWYmZVyGBS35StEnVZ5uboTtLr7V1TwEnUOiauKxKGL1d06cNdHPSZrFZZxOUfflibZbAYBsvgwqA+t0mIJoIS6No6iofYjSNCYYyKt8egFnhEaytdugM8jCWo4ZaUvZjU3Y39c2JtyciyP+ANVeTtVVFTwS0-TjP7oYR2dN6s7-EE4VGPmNTqvzcZ6TRT3CxjmVi5Zs18Qsch3tjLliat47A1OVN1mrS4MwHzPaxoDgfMSbyhiMViGGbQ0W8laPWxlk3aAtON5ZLCwCSsYCDnLbuVWtcFK+4BgWB8+bOu1jyqgSdjeFSfiDNq3oDKYseUUlBmpWNIu26nwmLbjmcpIV9klTnecbAXHuwTVINKjTdNdXUYxl80PqtVoEq6AWjw2I0RF0x3D2W4nvc2ynacS47tBp4TxOkwrxcg5qmJjOcVPklFmHNB83RGG9GGXeWoaQkTpNpAW8du6jSYpfcy31frD1vosIqDksBpxnmTF+3tmiXBqJDX4jxt512MB8EwIxd4Yl3ifQWPc4HJwQTQH66cHYATAEBDBg95ZF3nt7IkVxtQa1MIvfMSlTCw0DEfLqVMHi0OgVbC+jCXyINYZ9BYqiH65yfrwr2m0-TvweB4Xe2pAi+kMN4d0xgqwiMZpoeRXdFEMNeio5hSCM4oOvsg6erlsF8P0YAnoIwuptxxLKUhKkqTGG6AWcw9jwFkXikafsUAeCwEIPjZMrBSBpgzLonMU5D7aEPmYPojNLC+ipNhA6FDLr+zAZMaMST2wpLSYQbs8wzJ8HPn4vRdVtSzhsJDYwIDPiVgkadPowYdQ3QaaRJpg0mStLYO0px41RYWTUXjLOHDgKqKwc-fxdU-DYVDNKQY11SmeErGGXyOom7nALPYGhCSFn3WWekmB6NlF2y2SPTIuyuHOV8YcvpMkzB6DVMWS5dRrmtVuGQ-QzQlymG+ERXmJ8PmrPPs4jZ70PEFTQRPTBIL8kbWORCs50otB1Fhb6IMjpPR4WikuBwuhMWCDaV8pOLjfk30JePUqbieGewKZtPwPQhla0AQEJwrVbA6l8oGYMMowwRg5aklZ3KlG8s2fyr6wr+UirnmC9wFxqxhi6sEEY9haztHlW0R0q8mjkguSI9lrzWw6Sxdq3F-d8VsMyQ+LRJNDi9LFXVVUphvDR1+MpVUugjDB0JJqGNdQ26+H3FSSMnqjwJR9WsvuKcA3qNoNLWWPj3bhvJcra6MbUIKoGAmpNvo6aXHCqy3wK8zrt1zZA5JnKtWFvgVje2pasDO2ygcslFMECqipCqBt8aqYtvhURHQ5Ilx01DO1CRGquXDp+Xq7xiYvEEuNR5CNVQMQWoOta3mdqbm7z0EEGZNRZFzIgc0pZg7PmHt1WewNOzOH-inheoGV73AWBJBGRoVCbX7krA4TEJhSS2p1Bivt37tAFpxes-ugHx22UFZPXA+dSWiprVB70kokUiIZkm4wlY6w6EufOC43RzDun3UOvDRbzKEe2XfbhIadGUdnQq24Vx2NaAVfoJUNytS03+AM2U29xhYcWTh392KhY6o2ao-VkIx7FUctw6d4mS6EkGBKfwDxAE2C+F8ZNcbqzWAVaWIiNhPA8b-Xxkd7FDMnuA4JczFGTWQes-0ch9QRFaFVLcYKlM8JOpCDYd0Z0gwx00+8nTvr8MpyCwSg15VRNhtBZFyTtn2MODLrvGGlYIyXCVPmb49ZPi3Ry96vL-6DOGuC8JkSRqLMRao4SLQs5bUPFk8EhT8KFX4LMFdD0dYzqRBIqQOa8BihfsWZZ3MZwbpXDXrcG6uIoatRONdMOgRzDfG+OYCwJ8WRsn21OUMio6gVytf4WUO7e2NK9VApKb3NqNEdEWQYgx6hfHMNDWccoiKBX8HYX4Dj9IvbAKDyN3mPiGFtdGsYqKbqKl8LRpo-xEt1ipOjs+em-WTWxzJKwclULNQwvK59uEWPxYkQfWnCd6cFbeuLbxTP3CsquHtRtdx-jqHMYMb7eF3QxS6p+xJWm6GwOFy+QTc1xeEmdJcBw9Rmj7h9nWTCUmzpBBMPoR7dgBf5f4648q-KDe-AGE6Swh8bqPC+JhL7aLNRaF5iIsYvnCAG+scUg6dQLjlPtZ0BwBYVRNE1MrrN-xI8dI95YGmtqYcZY9OGX01JilU2jkmo2qpbA5967bA3SbqxSrGDK5cvpvTYSGXDLUzobP1-80ekt+UDequKRI6J84j5nUrGl2m+ggihWiRpwHeaB2ar80Ll37E9f-gNz1WcSb5zN3nBGAsNyvcRQcFmoMDxiJr-7S0nrQ-dVFbYR7rqNNmj2YbDKEvNy5Ikodgx+jQZcgw624QQAA */
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
      setData: null,
    },
    states: {
      idle: {
        on: {
          on_mount: [
            {
              target: "nepali",
              cond: "isNepali",
              actions: "np_mountSetup",
            },
            {
              target: "english",
              actions: "mountSetup",
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
        },
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
        },
      },
    },

    on: {
      on_props_is_nepali_change: [
        {
          target: ".nepali",
          cond: "isNepali",
          actions: "np_propsIsNepaliChange",
        },
        {
          target: ".english",
          actions: "propsIsNepaliChange",
        },
      ],

      on_props_date_change: [
        {
          target: ".nepali",
          actions: ["np_propsDateChange"],
          cond: "isNepali",
        },
        {
          target: ".english",
          actions: "propsDateChange",
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
      propsDateChange,
      np_propsDateChange,
      propsIsNepaliChange,
      np_propsIsNepaliChange,
    },
  }
);

// GUARDS

function isNepali(context: any, event: any) {
  return event?.data?.isNepali;
}

// ACTIONS
function propsIsNepaliChange(context: any, event: any) {
  if (context.date) {
    context.date = BSToAD(context.date);
    event?.data?.onChange?.(context.date);
  }

  let new_disable_date_before = context.disable_date_before
  let new_disable_date_after = context.disable_date_after

  if (context.disable_date_before) {
    new_disable_date_before = BSToAD(context.disable_date_before);
  }
  if (context.disable_date_after) {
    new_disable_date_after = BSToAD(context.disable_date_after);
  }

  event?.data?.setData?.((prev: any) => ({
    ...prev,
    isNepali: false,
    disableDateBefore: new_disable_date_before,
    disableDateAfter: new_disable_date_after,
  }))

  context.isNepali = false;
  context.disable_date_before = new_disable_date_before;
  context.disable_date_after = new_disable_date_after;
  context.grid_months = ENGLISH_MONTHS;
}
function np_propsIsNepaliChange(context: any, event: any) {
  if (context.date) {
    context.date = ADToBS(context.date);
    event?.data?.onChange?.(context.date);
  }

  let new_disable_date_before = context.disable_date_before
  let new_disable_date_after = context.disable_date_after

  if (context.disable_date_before) {
    new_disable_date_before = ADToBS(context.disable_date_before);
  }
  if (context.disable_date_after) {
    new_disable_date_after = ADToBS(context.disable_date_after);
  }

  event?.data?.setData?.((prev: any) => ({
    ...prev,
    isNepali: true,
    disableDateBefore: new_disable_date_before,
    disableDateAfter: new_disable_date_after,
  }))

  context.isNepali = true;
  context.disable_date_before = new_disable_date_before;
  context.disable_date_after = new_disable_date_after;
  context.grid_months = months.ne;
}
function propsDateChange(context: any, event: any) {

  if (event?.data?.date) {
    context.date = event?.data?.date;
  }

}

function np_propsDateChange(context: any, event: any) {

  if (event?.data?.date) {
    context.date = event?.data?.date;
  }

}

function mountSetup(context: any, event: any) {
  context.grid_months = ENGLISH_MONTHS;

  let newDate = context.date;

  if (context.date !== event?.data?.date) {
    newDate = event?.data?.date;
  }
  if (event?.data?.disableDateBefore) {
    context.disable_date_before = event?.data?.disableDateBefore;
  }
  if (event?.data?.disableDateAfter) {
    context.disable_date_after = event?.data?.disableDateAfter;
  }
  if (event?.data?.isNepali) {
    context.isNepali = event?.data?.isNepali;
  }
  // if (event?.data?.setData) {
  //   context.setData = event?.data?.setData;
  // }

  context.date = newDate;
  context.isNepali = false;
}
function np_mountSetup(context: any, event: any) {
  context.grid_months = months.ne;

  let newDate = context.date;

  if (context.date !== event?.data?.date) {
    newDate = event?.data?.date;
  }
  if (event?.data?.disableDateBefore) {
    context.disable_date_before = event?.data?.disableDateBefore;
  }
  if (event?.data?.disableDateAfter) {
    context.disable_date_after = event?.data?.disableDateAfter;
  }
  // if (event?.data?.isNepali) {
  //   context.isNepali = event?.data?.isNepali;
  // }

  if (event?.data?.setData) {
    context.setData = event?.data?.setData;
  }


  context.date = newDate;
  context.isNepali = true;
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
