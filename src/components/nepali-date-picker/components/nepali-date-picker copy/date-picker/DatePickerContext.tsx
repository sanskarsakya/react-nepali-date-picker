import * as React from 'react';
import * as fromCalendarEngine from '../calendar-engine';

// =======================

export const DatePickerContext = React.createContext<
  {
    is_dark: boolean;
    isBoundToRHF: boolean;
    date: string;
    calendarDate: string;
    dateType: string;
    disableDateBefore: string;
    disableDateAfter: string;

    _showCalendar: any;
    _setShowCalendar: any;
    _calendarDate: any;
    _setCalendarDate: any;
    _date: any;
    _setDate: any;
    _viewMode: any;
    _setViewMode: any;
    nepaliDatePickerInput: any;
    _isValid: string;
    _setIsValid: any;

    // FUNCTIONS
    onTodayClickHandlerEnglish: any;
    onNextMonthClickHandler: any;
    onPreviousMonthClickHandler: any;
    onNextYearClickHandler: any;
    onPreviousYearClickHandler: any;
    onNextDecadeClickHandler: any;
    onPreviousDecadeClickHandler: any;
    onYearSelectHandler: any;
    onMonthSelectHandler: any;
    onMonthViewModeHandler: any;
    onYearViewModeHandler: any;
    onSelectDateHandler: any;
    toggleCalendar: any;
    onInputChangeHandler: any;
    _calendarDates: fromCalendarEngine.IDayInfo[][];
  } |
  undefined
>(undefined);
