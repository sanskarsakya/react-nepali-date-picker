import * as React from 'react';
import { Box, Table } from '@chakra-ui/react';
import { ADToBS, BSToAD } from 'bikram-sambat-js';
import dayjs from 'dayjs';
import * as fromCalendarEngine from '../calendar-engine';
import { Case, Default, Switch, When } from 'react-if';
import { get_styles } from '../style';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  CalendarController,
  DateInput,
  DatePickerBody,
  DayPickerHeader,
  ErrorText,
  MonthController,
  MonthViewMode,
  Today,
  YearController,
  YearViewMode,
} from '../ui';
import { DateInputV2 } from '../ui/date-input-v2';
import { isEmpty } from 'lodash';

dayjs.extend(customParseFormat);

export const childOf = (childNode: any, parentNode: any): boolean =>
  parentNode.contains(childNode);

// =======================
export const DatePickerContext =
  React.createContext<
    | {
      is_dark: boolean;
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
      _isValid: any;
      _setIsValid: any;

      // FUNCTIONS
      onTodayClickHandler: any;
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
    }
    | undefined
  >(undefined);
DatePickerContext.displayName = 'DatePickerContext';

export const RigoNepaliDatePicker = (props: any) => {
  // VARIABLES
  const { date, calendarDate, children } = props;
  const nepaliDatePickerWrapper = React.useRef<HTMLDivElement>(null);
  const nepaliDatePickerInput = React.useRef<HTMLInputElement>(null);

  // LOCAL STATES
  const [_showCalendar, _setShowCalendar] = React.useState<boolean>(false);
  const [_calendarDate, _setCalendarDate] = React.useState('');
  const [_date, _setDate] = React.useState('');
  const [_isValid, _setIsValid] = React.useState<boolean>(true);
  const [_viewMode, _setViewMode] = React.useState(
    fromCalendarEngine.VIEW_MODE.CALENDAR,
  );
  const [_calendarDates, _setCalendarDates] = React.useState<
    fromCalendarEngine.IDayInfo[][]
  >([]);

  // FUNCTIONS
  const recalculateCalendarDates = React.useCallback(
    (date: string, calendarDate: string) => {
      const normalized_calendar_date =
        fromCalendarEngine.NEPALI_DATE.get_normalized_date(
          calendarDate,
          props.dateType,
        );

      const normalized_date =
        fromCalendarEngine.NEPALI_DATE.get_normalized_date(
          isEmpty(date) ? ADToBS(dayjs().format('YYYY-MM-DD')) : date,
          props.dateType,
        );

      const parsed_date = fromCalendarEngine.parse_date(
        normalized_calendar_date,
      );

      const selectedDate = fromCalendarEngine.parse_date(normalized_date);

      const weeks_in_nepali_month =
        fromCalendarEngine.NEPALI_DATE.get_weeks_in_month(parsed_date);

      const calendarDates: fromCalendarEngine.IDayInfo[][] = fromCalendarEngine
        .range(0, weeks_in_nepali_month)
        .map((weekNum: number) => {
          return fromCalendarEngine.range(1, 7).map((weekDayNum: number) => {
            return fromCalendarEngine.NEPALI_DATE.get_day_info(
              weekNum,
              weekDayNum,
              parsed_date,
              selectedDate,
            );
          });
        });

      _setCalendarDates(calendarDates);
    },
    [],
  );

  const handleClickOutside = React.useCallback((event: any) => {
    if (
      nepaliDatePickerWrapper.current &&
      childOf(event.target, nepaliDatePickerWrapper.current)
    ) {
      return;
    }

    _setShowCalendar(false);
  }, []);

  React.useLayoutEffect(() => {
    if (_showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [_showCalendar, handleClickOutside]);

  React.useEffect(() => {
    if (date) {
      _setDate(date);
    }
    if (calendarDate) {
      _setCalendarDate(calendarDate);
    }
    recalculateCalendarDates(date, calendarDate);
  }, [date, calendarDate, recalculateCalendarDates]);

  React.useLayoutEffect(() => {
    if (_showCalendar && nepaliDatePickerWrapper.current) {
      const nepaliDatePicker =
        nepaliDatePickerWrapper.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      const calender: HTMLDivElement | null =
        nepaliDatePickerWrapper.current.querySelector('.calender');
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

  const onTodayClickHandler = React.useCallback(() => {
    const todayDate = new Date();
    const nepali_date = ADToBS(todayDate);
    _setCalendarDate(nepali_date);
    _setDate(nepali_date);
    _setShowCalendar(false);
    props.onChange(nepali_date);
    recalculateCalendarDates(nepali_date, nepali_date);
  }, [props.onChange]);

  const onNextMonthClickHandler = React.useCallback(() => {
    const nextMonthDate =
      fromCalendarEngine.ENGLISH_DATE.get_next_month_date(_calendarDate);
    _setCalendarDate(nextMonthDate);
    recalculateCalendarDates(_date, nextMonthDate);
  }, [_calendarDate]);

  const onPreviousMonthClickHandler = React.useCallback(() => {
    const previousMonthDate =
      fromCalendarEngine.ENGLISH_DATE.get_previous_month_date(_calendarDate);
    _setCalendarDate(previousMonthDate);
    recalculateCalendarDates(_date, previousMonthDate);
  }, [_calendarDate]);

  const onNextYearClickHandler = React.useCallback(() => {
    const nextYearDate =
      fromCalendarEngine.ENGLISH_DATE.get_next_year_date(_calendarDate);
    _setCalendarDate(nextYearDate);
    recalculateCalendarDates(_date, nextYearDate);
  }, [_calendarDate]);

  const onPreviousYearClickHandler = React.useCallback(() => {
    const previousYearDate =
      fromCalendarEngine.ENGLISH_DATE.get_previous_year_date(_calendarDate);
    _setCalendarDate(previousYearDate);
    recalculateCalendarDates(_date, previousYearDate);
  }, [_calendarDate]);

  const onNextDecadeClickHandler = React.useCallback(() => {
    const nextDecadeDate =
      fromCalendarEngine.ENGLISH_DATE.get_next_decade_date(_calendarDate);
    _setCalendarDate(nextDecadeDate);
    recalculateCalendarDates(_date, nextDecadeDate);
  }, [_calendarDate]);

  const onPreviousDecadeClickHandler = React.useCallback(() => {
    const previousDecadeDate =
      fromCalendarEngine.ENGLISH_DATE.get_previous_decade_date(_calendarDate);
    _setCalendarDate(previousDecadeDate);
    recalculateCalendarDates(_date, previousDecadeDate);
  }, [_calendarDate]);

  const onYearSelectHandler = React.useCallback(
    (calendar_date: any) => {
      console.log(calendar_date);
      _setCalendarDate(calendar_date);
      recalculateCalendarDates(_date, calendar_date);
    },
    [_date],
  );

  const onMonthSelectHandler = React.useCallback(
    (calendar_date: any) => {
      console.log('month selection', calendar_date);
      _setCalendarDate(calendar_date);
      recalculateCalendarDates(_date, calendar_date);
    },
    [_date, recalculateCalendarDates],
  );

  const onMonthViewModeHandler = React.useCallback(() => {
    _setViewMode(fromCalendarEngine.VIEW_MODE.MONTH);
  }, []);

  const onYearViewModeHandler = React.useCallback((calendar_date: any) => {
    _setCalendarDate(calendar_date);
    recalculateCalendarDates(calendar_date, calendar_date);
    _setViewMode(fromCalendarEngine.VIEW_MODE.YEAR);
  }, []);

  const onSelectDateHandler = React.useCallback(
    (formattedDate: any) => {
      _setShowCalendar(false);
      _setDate(formattedDate);
      recalculateCalendarDates(formattedDate, _calendarDate);
      _setIsValid(true);
      props.onChange(formattedDate);
    },
    [_calendarDate, props.onChange],
  );

  const toggleCalendar = () => _setShowCalendar(visible => !visible);

  const onInputChangeHandler = React.useCallback(
    (val: any) => {
      if (isEmpty(val)) {
        console.log('empty string value');
        return;
      }

      const isCorrectlyFormatted = dayjs(val, 'YYYY-MM-DD').isValid();

      // CHECK IF IS CORRECT FOR TO SPLIT THE STRING
      if (!isCorrectlyFormatted) {
        console.log('not correctly formatted');
        _setIsValid(false);
        return;
      }
      console.log('correctly formatted');

      const isDateValid = fromCalendarEngine.NEPALI_DATE.is_date_valid(val);

      // CHECK IF STRICTLY VALID DATE
      if (!isDateValid) {
        console.log('invalid');
        _setIsValid(false);
        _setDate('');
        return;
      } else {
        _setIsValid(true);
        console.log('valid');
        _setDate(val);
        props.onChange(val);
        _setCalendarDate(val);
        recalculateCalendarDates(val, val);
      }
    },
    [props.onChange],
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
        onTodayClickHandler,
        onNextMonthClickHandler,
        onPreviousMonthClickHandler,
        onNextYearClickHandler,
        onPreviousYearClickHandler,
        onNextDecadeClickHandler,
        onPreviousDecadeClickHandler,
        onYearSelectHandler,
        onMonthSelectHandler,
        onMonthViewModeHandler,
        onYearViewModeHandler,
        onSelectDateHandler,
        toggleCalendar,
        onInputChangeHandler,
        _calendarDates,
      }}
    >
      <div
        style={{
          width: '100%',
          position: 'relative',
        }}
        ref={nepaliDatePickerWrapper}
      >
        {children}
      </div>
    </DatePickerContext.Provider>
  );
};

// =======================
export const useRigoNepaliDatePicker = () => {
  const context = React.useContext(DatePickerContext);
  if (context === undefined) {
    throw new Error(
      'useRigoNepaliDatePicker must be used within a <RigoNepaliDatePicker />',
    );
  }
  return context;
};

interface NepaliDatePickerProps {
  date: string;
  calendarDate: fromCalendarEngine.type_calendar_mode;
  dateType: string;
  is_dark?: boolean;
  disableDateBefore?: string;
  disableDateAfter?: string;
}

const NepaliDatePickerComponent = () => {
  const {
    _viewMode,
    _calendarDate,
    _showCalendar,
    onSelectDateHandler,
    is_dark,
    disableDateBefore,
    disableDateAfter,
    _date,
    _calendarDates,
    _isValid,
    _setIsValid,
    onTodayClickHandler,
    onPreviousMonthClickHandler,
    onPreviousYearClickHandler,
    onNextMonthClickHandler,
    onNextYearClickHandler,
    onMonthViewModeHandler,
    onYearViewModeHandler,
    nepaliDatePickerInput,
    toggleCalendar,
    onInputChangeHandler,
    _setViewMode,
    onMonthSelectHandler,
    onYearSelectHandler,
    onPreviousDecadeClickHandler,
    onNextDecadeClickHandler,
  } = useRigoNepaliDatePicker();

  const Styles = get_styles(is_dark);

  //FOR DAY PICKER BODY
  const handleDaySelection = (dayInfo: any) => {
    const selectedDate = `${dayInfo.primaryYear}-${dayInfo.primaryMonth
      .toString()
      .padStart(2, '0')}-${dayInfo.primaryDay.toString().padStart(2, '0')}`;
    onSelectDateHandler(selectedDate);
  };

  return (
    <>
      {/*RENDER INPUT*/}
      <DateInputV2
        nepaliDatePickerInput={nepaliDatePickerInput}
        _date={_date}
        toggleCalendar={toggleCalendar}
        onInputChangeHandler={onInputChangeHandler}
        _isValid={_isValid}
        _calendarDate={_calendarDate}
        disableDateBefore={disableDateBefore}
        disableDateAfter={disableDateAfter}
      />
      <ErrorText errorMessage={_isValid} />
      <When condition={_showCalendar && _calendarDate}>
        <Box sx={Styles.calendar} mt='10px'>
          <Box className='calender-wrapper'>
            <Switch>
              <Case
                condition={_viewMode === fromCalendarEngine.VIEW_MODE.MONTH}
              >
                <MonthController
                  maxYear={fromCalendarEngine.maxBSYear}
                  minYear={fromCalendarEngine.minBSYear}
                  nepaliWriting={true}
                  _calendarDate={_calendarDate}
                  onPreviousYearClickHandler={onPreviousYearClickHandler}
                  onNextYearClickHandler={onNextYearClickHandler}
                  onYearViewModeHandler={onYearViewModeHandler}
                />
                <MonthViewMode
                  monthsMap={fromCalendarEngine.months['ne']}
                  _calendarDate={_calendarDate}
                  _setViewMode={_setViewMode}
                  onMonthSelectHandler={onMonthSelectHandler}
                />
              </Case>
              <Case condition={_viewMode === fromCalendarEngine.VIEW_MODE.YEAR}>
                <YearController
                  maxYear={fromCalendarEngine.maxBSYear}
                  minYear={fromCalendarEngine.minBSYear}
                  _calendarDate={_calendarDate}
                  onPreviousDecadeClickHandler={onPreviousDecadeClickHandler}
                  onNextDecadeClickHandler={onNextDecadeClickHandler}
                  nepaliWriting={true}
                />
                <YearViewMode
                  maxYear={fromCalendarEngine.maxBSYear}
                  minYear={fromCalendarEngine.minBSYear}
                  _calendarDate={_calendarDate}
                  _setViewMode={_setViewMode}
                  onYearSelectHandler={onYearSelectHandler}
                  onPreviousDecadeClickHandler={onPreviousDecadeClickHandler}
                  onNextDecadeClickHandler={onNextDecadeClickHandler}
                  nepaliWriting={true}
                />
              </Case>
              <Default>
                <CalendarController
                  maxYear={fromCalendarEngine.maxBSYear}
                  minYear={fromCalendarEngine.minBSYear}
                  nepaliWriting={true}
                  monthMap={fromCalendarEngine.months['ne']}
                  _calendarDate={_calendarDate}
                  onPreviousMonthClickHandler={onPreviousMonthClickHandler}
                  onPreviousYearClickHandler={onPreviousYearClickHandler}
                  onNextMonthClickHandler={onNextMonthClickHandler}
                  onNextYearClickHandler={onNextYearClickHandler}
                  onMonthViewModeHandler={onMonthViewModeHandler}
                  onYearViewModeHandler={onYearViewModeHandler}
                />
                <MonthYearPanel />
                <Table variant='unstyled'>
                  <DayPickerHeader
                    weekNames={fromCalendarEngine.weeks['ne']}
                    isDark={is_dark}
                  />
                  <DatePickerBody
                    handleDaySelection={handleDaySelection}
                    _calendarDates={_calendarDates}
                    isDark={is_dark}
                    nepaliWriting={true}
                    disableDateBefore={disableDateBefore}
                    disableDateAfter={disableDateAfter}
                  />
                </Table>
                <Today
                isNepali={true}
                  disableDateAfter=''
                  disableDateBefore=''
                  onTodayClickHandler={onTodayClickHandler} />
              </Default>
            </Switch>
          </Box>
        </Box>
      </When>
    </>
  );
};

export const NepaliDatePicker = (props: NepaliDatePickerProps) => {
  return (
    <>
      <RigoNepaliDatePicker {...props}>
        <NepaliDatePickerComponent />
      </RigoNepaliDatePicker>
    </>
  );
};

export const MonthYearPanel = () => {
  const { _calendarDate, is_dark } = useRigoNepaliDatePicker();
  const splited_nepali_date = _calendarDate.split('-');
  const month = parseInt(splited_nepali_date[1]) - 1;
  const converted_english_date = BSToAD(_calendarDate);
  const splited_english_date = converted_english_date.split('-');
  const english_year = splited_english_date[0];

  const Styles = get_styles(is_dark);

  return (
    <Box sx={Styles.month_year_panel}>
      {`${fromCalendarEngine.englishMonthMap[month]} ${english_year}`}
    </Box>
  );
};
