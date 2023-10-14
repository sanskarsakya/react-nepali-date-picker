import dayjs from "dayjs";
import { createMachine } from "xstate";
import { ENGLISH_DATE, IDayInfo, range } from "../../components/nepali-date-picker/components/nepali-date-picker copy/calendar-engine";
import { englishToNepaliNumber } from "nepali-number";
import { ADToBS } from "bikram-sambat-js";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbMA7CqBOABAAoCWAxgNZh4B0JEmAxAPYAO2A+mRtrngNoAGALqJQrZrBIAXEsyxiQAD0QBGAOyqaGgJx6ALIIBsAZh3rDAVgA0IAJ6IThmgCYAHIMH63P9Zf-qAL6BtmiYOPjE5FR4LFgcuNJgHCRYrACu0kKiSCASUrLyiioILqomNOomPibG+qr6RoKW+rYOCAC03jSWmuoulg0mli4mJkEhIGG8kaSU1DTc4XwcAEbMEHYcbNiQcduZUhDJZOjR2Yr5MnIKuSUaWroGxmYWzW2I7jo05p6qbsNVKp3KpLMFQjwIoQ5jFFpCVutNtt2FhIDRcFsAG4kMAAdw4AFsNmB9qilNJCfJpAALLhnSgXXJXQq3UD3FyCHpGFz6dRGHTVWpGNzqD4IXRadR6PTuHmWAGqcFTeGzaILJYzPBrDZbHaoiDo1BYnH4onHUlgckcOxgfB084iS6Sa5FO5qdw-NyWTzCozqdRuIzlMWqIOWbS1QRC-QmIF6JXTKFRea0DVQ7VIvVojEcbF4ynm+QcVh4MDY5jpWDW21a04OnLiZ0s4pqco0Iz8nQ+P2xkz80X2NQxtw0Ro+tyNUOWDsJlXQtWpucZ3Uo7NG3MmgskotkinHbjHe0Mx1Mps3FvijQ0EwuOU6bl+PyxkPVEegzzjHQDW8C2fLVUpnC-5aoiK67AaOZ5qaxL7CWZZyJWCRgAeJz0hQjKNgU55uuKgguC+4w0BOniCFUPgeBof6asmsJpgiOrIuBhrGvmZrbvEcHlohRJYDSR7oSemEuqyyhqM0ri8vo8oWH2vT+iGoaPJ2OihqMHYmFRSYwuqS6gYx+rMRurEwUW0gbOudbHg2eRnq6bJDvo2j9FJvQuJo9TyYOCBdo53qeC4Oj6PoZR6G4ml8DROnAcu+lrix0GFvEOawGAmBkCyGE2VhdmiZenKWIFXZuEVgbFW4YoBpyXZ-IIIo6JYwwaZMiYRdpi7RXpWYQeuUFbvsPF8b1bH8ZlzLYfZCDjJyXj6PeX5jNJbkhl2RjtsYXYcopsnhQBtG6QxXWGUNJnxDadrHYelkCdZY05SUU00DNc2jMMIpLV5-xep66h4Q0wJ+m5O3zoBdF2p1q4GgNtIXexlK8bSKVpRlglZcJF7BeGHbetUfrNAMgbLX2ri-IIDxBV4YXNXOkXtZqMWHWdWow-sjMcIjyHIzdtkiSUQUuD0gjSuU3LlE4IYApjfICv0X7Tl2wSTFgxLwLkLW7dQTrZTziAdKoYq60Tv39F4PI+Hh+hAzTdAMGAmtozhvJigF4b3qGArlNOqg+pbbVAXT4PgXbzY4S0FVdtoXteP6gz1bePsLn76YBwZkGbmxQfjblDT8z+96aBotWDDYH3mBUjR6P4PpeKY8cg-tmYQzQUNGQltunlrF6mI5RgtPVAOk2My1uFoMYjCpqgV6+td7R1B2N6zMMZ3diBd+2vfTsbovix4RGgmY1UAreRgK4EQA */
    context: {
      date: "",
      calendar_reference_date: "",
      grid_dates: [],
      show_calendar_body: "",
      panel_year: "",
      panel_month: "",
      disable_date_before: "2023-07-29",
      disable_date_after: "2023-10-29",
    },

    id: "Calendar Picker",
    initial: "idle",

    states: {
      idle: {
        on: {
          open_calendar: {
            target: "calendar_body_opened",
          }
        }
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
                target: undefined,
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
              }
            },
          },
          month_view_mode: {
            on: {
              on_month_selection: {
                target: "day_view_mode",
              },
            },
          },
          year_view_mode: {
            on: {
              on_year_selection: {
                target: "day_view_mode",
              },
            },
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
        actions: ["setDate", "setCalendarReferenceDate", "setPanelMonth", "setPanelYear", "setGridDates"]
      }
    }
  },
  {
    actions: {
      setDate,
      setCalendarReferenceDate,
      setGridDates,
      closeCalendarBody,
      open_calendar_body,
      setPanelMonth,
      setPanelYear,
      increment_month,
      decrement_month,
      decrement_year,
      increment_year,
      setToday,
    },
    services: {},
    guards: {},
    delays: {},
  }
);

// ACTIONS
function setDate(context: any, event: any) {
  console.log("event", event);
  context.date = event?.data?.date ?? dayjs().format("YYYY-MM-DD");
}
function setCalendarReferenceDate(context: any, event: any) {
  context.calendar_reference_date = event?.data?.date ?? dayjs().format("YYYY-MM-DD");
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
function closeCalendarBody(context: any, event: any) {
  // context.calendar_reference_date = event.data.calendar_reference_date ?? dayjs().format("yyyy-mm-dd")
}
function open_calendar_body(context: any, event: any) {
  // context.calendar_reference_date = event.data.calendar_reference_date ?? dayjs().format("yyyy-mm-dd")
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
