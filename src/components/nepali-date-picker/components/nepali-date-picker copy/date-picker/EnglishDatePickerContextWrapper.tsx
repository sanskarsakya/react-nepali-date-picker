import dayjs from 'dayjs';
import * as React from 'react';
import * as fromCalendarEngine from '../calendar-engine';
import { childOf, dateFormat } from '.';
import { DatePickerContext } from './DatePickerContext';


export const EnglishDatePickerContextWrapper = (props: any) => {
  // VARIABLES
  const { date, calendarDate, children, disableDateBefore = "", disableDateAfter = "" } = props;
  const nepaliDatePickerWrapper = React.useRef<HTMLDivElement>(null);
  const nepaliDatePickerInput = React.useRef<HTMLInputElement>(null);

  // LOCAL STATES
  const [_showCalendar, _setShowCalendar] = React.useState<boolean>(false);
  const [_calendarDate, _setCalendarDate] = React.useState('');
  const [_date, _setDate] = React.useState('');
  const [_isValid, _setIsValid] = React.useState<string>("");
  const [_viewMode, _setViewMode] = React.useState(
    fromCalendarEngine.VIEW_MODE.CALENDAR
  );
  const [_calendarDates, _setCalendarDates] = React.useState<
    fromCalendarEngine.IDayInfo[][]
  >([]);

  // FUNCTIONS
  const recalculateCalendarDates = React.useCallback(
    (date: string, calendarDate: string) => {
      const normalized_date = fromCalendarEngine.ENGLISH_DATE.get_normalized_date(
        date,
        props.dateType
      );

      const normalized_calendar_date = fromCalendarEngine.ENGLISH_DATE.get_normalized_date(
        calendarDate,
        props.dateType
      );

      const weeks_in_english_month = fromCalendarEngine.ENGLISH_DATE.get_weeks_in_month(
        new Date(normalized_calendar_date)
      );

      const calendarDates: fromCalendarEngine.IDayInfo[][] = fromCalendarEngine
        .range(0, weeks_in_english_month - 1)
        .map((weekNum: number) => {
          return fromCalendarEngine.range(1, 7).map((weekDayNum: number) => {
            return fromCalendarEngine.ENGLISH_DATE.get_day_info(
              weekNum,
              weekDayNum,
              normalized_calendar_date,
              normalized_date
            );
          });
        });

      _setCalendarDates(calendarDates);
    },
    []
  );

  const handleClickOutside = React.useCallback((event: any) => {
    if (nepaliDatePickerWrapper.current &&
      childOf(event.target, nepaliDatePickerWrapper.current)) {
      return;
    }

    _setShowCalendar(false);
  }, []);

  // ============================
  // EFFECTS
  // ============================
  React.useEffect(() => {
    if (date) {
      _setDate(date);
    }
    if (calendarDate) {
      _setCalendarDate(calendarDate);
    }
    // should validate here
    recalculateCalendarDates(date, calendarDate);
  }, []);


  React.useLayoutEffect(() => {
    if (_showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [_showCalendar, handleClickOutside]);


  React.useLayoutEffect(() => {
    if (_showCalendar && nepaliDatePickerWrapper.current) {
      const nepaliDatePicker = nepaliDatePickerWrapper.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      const calender: HTMLDivElement | null = nepaliDatePickerWrapper.current.querySelector('.calender');
      if (calender) {
        setTimeout(() => {
          const calenderHeight = calender.clientHeight;

          if (calenderHeight + nepaliDatePicker.bottom > screenHeight) {
            if (calenderHeight < nepaliDatePicker.top) {
              calender.style.bottom = `${nepaliDatePicker.height}px`;
            }
          }
        }, 0);
      }
    }
  }, [_showCalendar]);


  // ============================
  // CLICK EVENTS
  // ============================
  const onTodayClickHandlerEnglish = React.useCallback(() => {
    const formattedTodayDate = dayjs().format('YYYY-MM-DD');
    _setCalendarDate(formattedTodayDate);
    _setDate(formattedTodayDate);
    _setShowCalendar(false);
    props.onChange(formattedTodayDate);
    recalculateCalendarDates(formattedTodayDate, formattedTodayDate);
  }, [props.onChange]);


  // ============================
  // CALENDAR CONTROL CLICK HANDLERS
  // ============================
  const onNextMonthClickHandler = React.useCallback(() => {
    const nextMonthDate = fromCalendarEngine.ENGLISH_DATE.get_next_month_date(_calendarDate);
    _setCalendarDate(nextMonthDate);
    recalculateCalendarDates(_date, nextMonthDate);
  }, [_calendarDate]);

  const onPreviousMonthClickHandler = React.useCallback(() => {
    const previousMonthDate = fromCalendarEngine.ENGLISH_DATE.get_previous_month_date(_calendarDate);
    _setCalendarDate(previousMonthDate);
    recalculateCalendarDates(_date, previousMonthDate);
  }, [_calendarDate]);

  const onNextYearClickHandler = React.useCallback(() => {
    const nextYearDate = fromCalendarEngine.ENGLISH_DATE.get_next_year_date(_calendarDate);
    _setCalendarDate(nextYearDate);
    recalculateCalendarDates(_date, nextYearDate);
  }, [_calendarDate]);

  const onPreviousYearClickHandler = React.useCallback(() => {
    const previousYearDate = fromCalendarEngine.ENGLISH_DATE.get_previous_year_date(_calendarDate);
    _setCalendarDate(previousYearDate);
    recalculateCalendarDates(_date, previousYearDate);
  }, [_calendarDate]);

  const onNextDecadeClickHandler = React.useCallback(() => {
    const nextDecadeDate = fromCalendarEngine.ENGLISH_DATE.get_next_decade_date(_calendarDate);
    _setCalendarDate(nextDecadeDate);
    recalculateCalendarDates(_date, nextDecadeDate);
  }, [_calendarDate]);

  const onPreviousDecadeClickHandler = React.useCallback(() => {
    const previousDecadeDate = fromCalendarEngine.ENGLISH_DATE.get_previous_decade_date(_calendarDate);
    _setCalendarDate(previousDecadeDate);
    recalculateCalendarDates(_date, previousDecadeDate);
  }, [_calendarDate]);

  const onYearSelectHandler = React.useCallback(
    (calendar_date: any) => {
      console.log(calendar_date);
      _setCalendarDate(calendar_date);
      recalculateCalendarDates(_date, calendar_date);
    },
    [_date]
  );

  const onMonthSelectHandler = React.useCallback(
    (calendar_date: any) => {
      console.log('month selection', calendar_date);
      _setCalendarDate(calendar_date);
      recalculateCalendarDates(_date, calendar_date);
    },
    [_date, recalculateCalendarDates]
  );

  const onMonthViewModeHandler = React.useCallback(() => {
    _setViewMode(fromCalendarEngine.VIEW_MODE.MONTH);
  }, []);

  const onYearViewModeHandler = React.useCallback((calendar_date: any) => {
    _setCalendarDate(calendar_date);
    recalculateCalendarDates(_date, calendar_date);
    _setViewMode(fromCalendarEngine.VIEW_MODE.YEAR);
  }, []);

  const onSelectDateHandler = React.useCallback(
    (formattedDate: any) => {
      _setShowCalendar(false);
      _setDate(formattedDate);
      recalculateCalendarDates(formattedDate, _calendarDate);
      _setIsValid("");
      props.onChange(formattedDate);
    },
    [_calendarDate, props.onChange]
  );

  const toggleCalendar = () => _setShowCalendar(visible => !visible);

  
  // ============================
  // VALIDATION FUNCTIONS
  // ============================
  const validate = (val: string) => {

    const isCorrectlyFormatted = dayjs(val, 'YYYY-MM-DD').isValid();
    if (!isCorrectlyFormatted) {
      return {
        message: "Invalid Format",
        is_valid: false
      };
    }

    if (+val.slice(0, 4) < 1900) {
      return {
        message: "Date is less than min date",
        is_valid: false
      };
    }

    if (+val.slice(0, 4) > 2042) {
      return {
        message: "Date is greater than max date",
        is_valid: false
      };
    }

    const isDateValid = fromCalendarEngine.ENGLISH_DATE.is_date_valid(val);
    if (!isDateValid) {
      return {
        message: "Invalid Date",
        is_valid: false
      };
    }

    if (disableDateAfter?.length > 0 || disableDateBefore?.length > 0) {
      const disabledDateBefore = new Date(disableDateBefore) ?? new Date('0001-01-01');
      const selectedDate = new Date(val);
      const disabledDateAfter = new Date(disableDateAfter) ?? new Date('9999-01-01');
      const isValid = dateFormat.test(val) &&
        disabledDateBefore < selectedDate &&
        selectedDate < disabledDateAfter
      if (!isValid) {
        return {
          message: "This date is out of range",
          is_valid: false
        };
      }
    }

    return {
      is_valid: true,
      message: "",
    };
  };

  const onInputChangeHandler = React.useCallback(
    (val: any) => {

      if (val?.length !== 10) {
        return;
      }

      const validation_result = validate(val);

      if (!validation_result.is_valid) {
        return;
      }

      _setCalendarDate(val);
      _setDate(val);
      recalculateCalendarDates(val, val);
    },
    []
  );

  return (
    <DatePickerContext.Provider
      value={{
        ...props,
        // VALUES
        _showCalendar,
        _viewMode,
        _setShowCalendar,
        _calendarDate,
        _setCalendarDate,
        _date,
        _setDate,
        _setViewMode,
        nepaliDatePickerInput,
        _isValid,
        _setIsValid,

        // FUNCTIONS
        onTodayClickHandlerEnglish,
        
        onNextMonthClickHandler,
        onPreviousMonthClickHandler,
        onNextYearClickHandler,
        onPreviousYearClickHandler,
        onNextDecadeClickHandler,
        onPreviousDecadeClickHandler,
        
        onYearSelectHandler,
        onMonthSelectHandler,
        onSelectDateHandler,
        
        onMonthViewModeHandler,
        onYearViewModeHandler,
        
        toggleCalendar,
        onInputChangeHandler,
        _calendarDates,
      }}
    >
      <div
        id={'input-wrapper-2'}
        style={{
          width: '100%',
          // minWidth: '120px',
          // maxWidth: '120px',
          position: 'relative',
        }}
        ref={nepaliDatePickerWrapper}
      >
        {children}
      </div>
    </DatePickerContext.Provider>
  );
};
