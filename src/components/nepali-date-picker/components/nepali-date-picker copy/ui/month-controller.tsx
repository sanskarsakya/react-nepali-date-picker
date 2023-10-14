import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { useDatePicker } from '../date-picker/useDatePicker';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { YearPicker } from './year-picker';
import * as fromCalendarEngine from '../calendar-engine';


export const MonthController = () => {
  const {
    _calendarDate,
    onPreviousYearClickHandler,
    onNextYearClickHandler,
    onYearViewModeHandler,
  } = useDatePicker();


  const [_selected, _setSelected] = React.useState<number>(1);

  React.useEffect(() => {
    if (_calendarDate) {
      const splited_calendar_date = _calendarDate.split('-');
      _setSelected(parseInt(splited_calendar_date[0]));
    }
  }, [_calendarDate]);

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
      <Button
        size='xs'
        px={7}
        _hover={{ bg: 'gray.100' }}
        variant='link'
        onClick={onPreviousYearClickHandler}
        isDisabled={_selected - 1 < fromCalendarEngine.minADYear}
      >
        <AiOutlineDoubleLeft color='black' />
      </Button>

      <YearPicker
        handleYearViewMode={handleYearViewMode}
        selectedvalue={_selected}
        nepaliWriting={false}
      />

      <Button
        size='xs'
        px={7}
        _hover={{ bg: 'gray.100' }}
        variant='link'
        onClick={onNextYearClickHandler}
        isDisabled={_selected + 1 > fromCalendarEngine.maxADYear}
      >
        <AiOutlineDoubleRight color='black' />
      </Button>
    </Flex>
  );
};
