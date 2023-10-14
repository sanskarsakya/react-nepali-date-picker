import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { If, Then, Else } from 'react-if';
import { englishToNepaliNumber } from 'nepali-number';
import { useDatePicker } from '../date-picker/useDatePicker';
import * as fromCalendarEngine from '../calendar-engine';

export const YearController = () => {
  const {
    _calendarDate,
    onPreviousDecadeClickHandler,
    onNextDecadeClickHandler,
  } = useDatePicker();


  const [_selected, _setSelected] = React.useState<number>(1);

  React.useEffect(() => {
    if (_calendarDate) {
      const splited_calendar_date = _calendarDate.split('-');
      _setSelected(parseInt(splited_calendar_date[0]));
    }
  }, [_calendarDate]);

  return (
    <Flex justifyContent='space-between' p={1} pt={3}>
      <Button
        size='xs'
        px={7}
        _hover={{ bg: 'gray.100' }}
        variant='link'
        onClick={onPreviousDecadeClickHandler}
        isDisabled={_selected - 10 <= fromCalendarEngine.minADYear}
      >
        <AiOutlineDoubleLeft color='black' />
      </Button>
      <If condition={false}>
        <Then>
          <Text p={2} fontSize='16px' fontWeight='600'>
            {englishToNepaliNumber(_selected)} -{' '}
            {englishToNepaliNumber(_selected + 10)}
          </Text>
        </Then>
        <Else>
          <Text p={2} fontSize='16px' fontWeight='600'>
            {_selected} - {_selected + 10}
          </Text>
        </Else>
      </If>

      <Button
        size='xs'
        px={7}
        _hover={{ bg: 'gray.100' }}
        variant='link'
        onClick={onNextDecadeClickHandler}
        isDisabled={_selected + 10 > fromCalendarEngine.maxADYear}
      >
        <AiOutlineDoubleRight color='black' />
      </Button>
    </Flex>
  );
};
