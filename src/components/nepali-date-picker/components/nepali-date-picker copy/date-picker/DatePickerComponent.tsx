import { Box, Table } from '@chakra-ui/react';
import * as React from 'react';
import { Case, Default, Switch, When } from 'react-if';
import * as fromCalendarEngine from '../calendar-engine';
import { get_styles } from '../style';
import {
  CalendarController, DatePickerBody,
  DayPickerHeader,
  ErrorText,
  MonthController,
  MonthViewMode,
  Today,
  YearController,
  YearViewMode
} from '../ui';
import { DateInputV2 } from '../ui/date-input-v2';
import { MonthYearPanel } from '../ui/month-year-panel';
import { useDatePicker } from './useDatePicker';

export const DatePickerComponent = () => {
  const {
    _viewMode, _calendarDate, _showCalendar, is_dark, isBoundToRHF,
  } = useDatePicker();

  const Styles = get_styles(is_dark);

  //FOR DAY PICKER BODY
  return (
    <>
      {/*RENDER INPUT*/}
      <DateInputV2 />
      <When condition={!isBoundToRHF}>
        <ErrorText />
      </When>
      <When condition={_showCalendar && _calendarDate}>
        <Box sx={Styles.calendar} mt='10px'>
          <Box className='calender-wrapper'>
            <Switch>
              <Case condition={_viewMode === fromCalendarEngine.VIEW_MODE.MONTH}>
                <MonthController />
                <MonthViewMode />
              </Case>
              <Case condition={_viewMode === fromCalendarEngine.VIEW_MODE.YEAR}>
                <YearController />
                <YearViewMode />
              </Case>
              <Default>
                <CalendarController />
                <MonthYearPanel />
                <Table variant='unstyled'>
                  <DayPickerHeader />
                  <DatePickerBody />
                </Table>
                <Today />
              </Default>
            </Switch>
          </Box>
        </Box>
      </When>
    </>
  );
};
