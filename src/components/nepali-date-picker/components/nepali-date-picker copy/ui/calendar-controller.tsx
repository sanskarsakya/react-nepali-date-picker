import React from 'react';
import { Flex, Button, Text, Center } from '@chakra-ui/react';
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import * as fromCalendarEngine from '../calendar-engine';

import { MonthPicker } from './month-picker';
import { YearPicker } from './year-picker';
import { useDatePicker } from '../date-picker/useDatePicker';

/**
 * Initializes the CalendarController component.
 * << < october - 2023 > >>
 * 
 * @return {JSX.Element} The rendered CalendarController component.
 */
export const CalendarController = () => {

  const {
    _calendarDate,
    onPreviousMonthClickHandler,
    onPreviousYearClickHandler,
    onNextMonthClickHandler,
    onNextYearClickHandler,
    onMonthViewModeHandler,
    onYearViewModeHandler,
  } = useDatePicker();


  const [_selected, _setSelected] = React.useState<number>(1);
  const [_selectedMonth, _setSelectedMonth] = React.useState<number>(1);

  React.useEffect(() => {
    if (_calendarDate) {
      const splited_calendar_date = _calendarDate.split('-');
      _setSelected(parseInt(splited_calendar_date[0]));
      _setSelectedMonth(parseInt(splited_calendar_date[1]));
    }
  }, [_calendarDate]);

  const selectedMonthvalue = fromCalendarEngine.ENGLISH_MONTHS[_selectedMonth - 1];

  const nearestTensPlace = React.useMemo(() => {
    if (_calendarDate) {
      const year = parseInt(_calendarDate.split('-')[0]);
      return Math.floor(year / 10) * 10;
    }
    return null;
  }, [_calendarDate]);

  const handleYearViewMode = () => {
    if (nearestTensPlace !== null) {
      onYearViewModeHandler(`${nearestTensPlace}-01-01`);
    }
  };


  return (
    <Flex justifyContent='space-between' p={1} pt={3}>
      <Flex gap={1}>
        <Button
          size='xs'
          px={3}
          _hover={{ bg: 'gray.100' }}
          variant='link'
          onClick={onPreviousYearClickHandler}
          isDisabled={_selected - 1 < fromCalendarEngine.minADYear}
        >
          <AiOutlineDoubleLeft color='black' />
        </Button>
        <Button
          size='xs'
          px={3}
          variant='link'
          _hover={{ bg: 'gray.100' }}
          onClick={onPreviousMonthClickHandler}
          isDisabled={_selected + 1 < fromCalendarEngine.minADYear}
        >
          <AiOutlineLeft color='black' />
        </Button>
      </Flex>
      <Flex gap='2px'>
        <MonthPicker
          handleMonthViewMode={onMonthViewModeHandler}
          selectedvalue={selectedMonthvalue}
        />
        <Center>
          <Text fontSize='16px' fontWeight='600'>
            -
          </Text>
        </Center>
        <YearPicker
          handleYearViewMode={handleYearViewMode}
          selectedvalue={_selected}
          nepaliWriting={false}
        />
      </Flex>
      <Flex gap={1}>
        <Button
          size='xs'
          px={3}
          _hover={{ bg: 'gray.100' }}
          variant='link'
          onClick={onNextMonthClickHandler}
          isDisabled={_selected > fromCalendarEngine.maxADYear}
        >
          <AiOutlineRight color='black' />
        </Button>
        <Button
          size='xs'
          px={3}
          _hover={{ bg: 'gray.100' }}
          variant='link'
          onClick={onNextYearClickHandler}
          isDisabled={_selected + 1 > fromCalendarEngine.maxADYear}
        >
          <AiOutlineDoubleRight color='black' />
        </Button>
      </Flex>
    </Flex>
  );
};
