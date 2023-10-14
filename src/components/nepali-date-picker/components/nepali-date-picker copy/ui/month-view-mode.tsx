import { Box, Button, Flex, Text } from '@chakra-ui/react';
import * as fromCalendarEngine from '../calendar-engine';
import { useDatePicker } from '../date-picker/useDatePicker';


export const MonthViewMode = () => {

  const {
    _calendarDate,
    _setViewMode,
    onMonthSelectHandler,
  } = useDatePicker();


  return (
    <Box width='325px'>
      <Flex
        style={{
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          columnGap: '4px',
          rowGap: '8px',
        }}
        p={2}
      >
        {fromCalendarEngine.ENGLISH_MONTHS.map((month: any, index: any) => {
          const splited_calendar_date = _calendarDate.split('-');
          const new_date = fromCalendarEngine.stitch_date({
            year: splited_calendar_date[0],
            month: index + 1,
            day: 1,
          });
          return (
            <Button
              key={index}
              size={'sm'}
              variant='unstyled'
              minWidth='100px'
              color='black'
              _hover={{ color: '#0875e1', bg: 'gray.100' }}
              onClick={() => {
                onMonthSelectHandler(new_date);
                _setViewMode(fromCalendarEngine.VIEW_MODE.CALENDAR);
              }}
              style={{
                flex: '0 0 calc(33.33% - 8px)',
                boxSizing: 'border-box',
                padding: '4px',
              }}
            >
              <Text fontWeight='400'>{month}</Text>
            </Button>
          );
        })}
      </Flex>
    </Box>
  );
};

export default MonthViewMode;
