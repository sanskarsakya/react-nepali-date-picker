import dayjs from "dayjs";
import _ from "lodash";
import { create } from "zustand";
import { ENGLISH_MONTHS, weeks } from "../calendar-engine";
import { getStrategy } from "./strategy/strategy-provider";
import { Pipeline } from "./utils/execution-pipeline";

export type ICalendarState = {
    /**
     * This is the date that is used to
     * bind in date input.
     */
    date: string;

    /**
     * This is used to determine if the calendar
     * context is in nepali or english.
     */
    isNepali: boolean | null;

    /**
     * This is the date that is used to
     * disable dates before this date.
     */
    disableDateBefore: string;

    /**
     * This is the date that is used to
     * disable dates after this date.
     */
    disableDateAfter: string;

    /**
     * This is the date that is used to 
     * generate the calendar grid date.
     */
    calendarReferenceDate: string;

    /**
     * This is holds the generated dates
     * for the calendar grid 
     * based on calendarReferenceDate .
     */
    gridDates: any[];

    /**
     * This is used as flag to 
     * switch between calendar view
     * or month view 
     * or year view
     */
    viewMode: "CALENDAR_VIEW" | "MONTH_VIEW" | "YEAR_VIEW";

    /**
     * This is the data that is shown in the
     * month year panel.
     */
    monthYearPanelData: string;

    /**
     * This is the data that is shown in the
     * year view mode.
     */
    gridYears: any[];

    /**
     * Holds the value for error message
     * used for chekcing if date or today date is valid
     */
    error: string;

    /**
     * This is the array of months that is used
     * to generate the month grid.
     */
    gridMonths: string[];

    /**
     * This is used to determine if today's date
     * is valid or not.
     */
    isTodayValid: boolean;

    /**
     * This is the data that is shown in the
     * calendar controller.
     */
    controllerLabel: {
        month: string;
        year: string;
    };

    // ACTIONS

    /**
     * This is used to setup the calendar
     */
    mountSetup: ((props: any, onClose: any) => void);

    /**
     * This is used to open the calendar body
     * and bind necessary data.
     * 
     */
    openCalendar: () => void,

    /**
     * this is used to navigate to next month
     * from calendar controller
     */
    nextMonth: () => void,

    /**
     * This is used to navigate to previous month
     * from calendar controller
     */
    previousMonth: () => void,

    /**
     *
     * This is used to navigate to next year
     * from calendar controller 
     */
    nextYear: () => void,

    /**
     *
     * This is used to navigate to previous year
     * from calendar controller 
     */
    previousYear: () => void,

    /**
     * This is used to select a day from the calendar
     * grid.
     */
    selectDay: (date: string) => void,

    /**
     * This is used to select today's date
     */
    selectToday: () => void,

    /**
     * This is used to navigate to month view
     * from calendar controller
     */
    goToMonthView: () => void,

    /**
     * This is used to navigate to year view
     * from calendar controller
     */
    goToYearView: () => void,

    /**
     * This is used to update grid with 
     * next decade year for year view mode 
     */
    getNextDecadeYearGrid: () => void,

    /**
     * This is used to update grid with
     * previous decade year for year view mode 
     */
    getPreviousDecadeYearGrid: () => void,

    /**
     * This is used to select year from year view mode 
     */
    selectYear: (year: number) => void,

    /**
     * This is used to update to next year
     * from month view mode 
     */
    getNextYear: () => void,

    /**
     * This is used to update to previous year
     * from month view mode 
     */
    getPreviousYear: () => void,

    /**
     * This is used to select month from month view mode 
     */
    selectMonth: (month: number) => void,

    /**
     *
     * This is holds the ref to onClose function
     * used to close the calendar body 
     */
    onClose: (month: number) => void,

    /**
     *
     * This holds the ref to onChnage function
     * used to expose data outside date picker 
     */
    onChange: () => void,

    /**
     *
     * This is the function that is used on
     * date input component to update the date
     * and calendar reference date. 
     */
    onDateChange: (date: string) => void,

    /**
     *
     * Switch between nepali and english context 
     */
    toggleContext: (context?: boolean) => void,

    /**
     * This is used to set the week data 
     * for calendar body view
     */
    weeks: any[]
}


export const useCalendarStore = create<ICalendarState>((set, get) => ({
    date: "",
    isNepali: null,
    calendarReferenceDate: dayjs().format("YYYY-MM-DD"),
    gridDates: [],
    viewMode: "CALENDAR_VIEW",
    monthYearPanelData: "",
    disableDateBefore: "",
    disableDateAfter: "",
    gridYears: [],
    error: "",
    gridMonths: ENGLISH_MONTHS,
    isTodayValid: false,
    weeks: weeks["en"],

    onClose: () => { },
    onChange: () => { },
    controllerLabel: {
        month: "",
        year: "",
    },

    // ACTIONS
    mountSetup: async (props, onClose) => {

        const { isNepali, date, onChange, disableDateBefore, disableDateAfter } = props;
        const cloned = _.cloneDeep(get());

        cloned.isNepali = isNepali ?? false
        cloned.onClose = onClose
        cloned.onChange = onChange

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.setDate,
            strategyProvider.normalizeDates,
            strategyProvider.setDisableDateBefore,
            strategyProvider.setDisableDateAfter,
            strategyProvider.setGridMonths,
            strategyProvider.setCalendarReferenceDate,
        ).execute({
            next: cloned,
            params: {
                date,
                disableDateBefore,
                disableDateAfter,
            },
        })

        set(next)


    },

    openCalendar: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.setViewModeToCalendar,
            strategyProvider.setCalendarReferenceDate,
            strategyProvider.setIsTodayValid,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
        ).execute({ next: cloned })

        set(next)

    },
    nextMonth: async () => {

        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.incrementMonth,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
        ).execute({ next: cloned })

        set(next)

    },
    previousMonth: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.decrementMonth,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
        ).execute({ next: cloned })

        set(next)

    },
    nextYear: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.incrementYear,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
        ).execute({ next: cloned })

        set(next)

    },
    previousYear: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.decrementYear,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
        ).execute({ next: cloned })

        set(next)

    },
    selectDay: async (date) => {

        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.setDate,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
            strategyProvider.closeCalendarPicker,
            strategyProvider.sendChanges,
        ).execute({
            next: cloned,
            params: {
                date
            }
        })

        set(next)

    },
    selectToday: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.checkIfTodayIsValid, // might not need
            strategyProvider.setTodayAsDate,
            strategyProvider.setTodayAsCalendarReferenceDate,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
            strategyProvider.closeCalendarPicker,
            strategyProvider.sendChanges,
        ).execute({ next: cloned })

        set(next)

    },
    goToMonthView: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.setViewModeToMonth,
        ).execute({
            next: cloned,
        })

        set(next)
    },
    goToYearView: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.setViewModeToYear,
            strategyProvider.setGridYears,
        ).execute({
            next: cloned,
        })

        set(next)

    },
    getNextDecadeYearGrid: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.updateGridYearWithNextDecade,
        ).execute({
            next: cloned,
        })

        set(next)
    },
    getPreviousDecadeYearGrid: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.updateGridYearWithPreviousDecade,
        ).execute({
            next: cloned,
        })

        set(next)
    },
    selectYear: async (year) => {

        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.selectYear,
            strategyProvider.setViewModeToMonth,
        ).execute({
            next: cloned,
            params: {
                year
            }
        })

        set(next)

    },

    getNextYear: async () => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.updateMonthViewWithNextYear,
        ).execute({
            next: cloned,
        })

        set(next)
    },

    getPreviousYear: async () => {

        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.updateMonthViewWithPreviousYear,
        ).execute({
            next: cloned,
        })

        set(next)
    },

    selectMonth: async (month) => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.selectMonth,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
            strategyProvider.setViewModeToCalendar,
        ).execute({
            next: cloned,
            params: { month }
        })

        set(next)

    },

    onDateChange: async (date) => {
        const cloned = _.cloneDeep(get());

        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.setDate,
            strategyProvider.sendChanges,
            strategyProvider.checkIfDateIsValid,
            strategyProvider.setCalendarReferenceDate,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
        ).execute({
            next: cloned,
            params: {
                date
            }
        })

        set(next)

    },

    toggleContext: async (context) => {
        const cloned = _.cloneDeep(get());

        // ALWAYS TOGGLE FIRST
        cloned.isNepali = context || !cloned.isNepali;
        
        // break the loop toggleCOntext => statechange => useeffect => toggleContext 
        // set(cloned)

        // THEN GET STRATEGY
        const strategyProvider = getStrategy(cloned.isNepali as boolean);

        const { next } = await Pipeline<any>(
            strategyProvider.convertdatesToCurrentContext,
            strategyProvider.setCalendarReferenceDate,
            strategyProvider.setGridMonths,
            strategyProvider.setGridDates,
            strategyProvider.setMonthYearPanelData,
            strategyProvider.setCalendarControllerLabels,
            strategyProvider.sendChanges,
        ).execute({
            next: cloned,
        })

        set(next)

    },

}))

