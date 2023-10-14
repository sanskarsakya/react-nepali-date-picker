import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { englishToNepaliNumber } from 'nepali-number';
import { Else, If, Then } from 'react-if';
import * as fromCalendarEngine from '../calendar-engine';
import { useDatePicker } from '../date-picker/useDatePicker';

/**
 * Renders the year view mode of the Nepali date picker.
 *
 * @return {JSX.Element} The JSX element representing the year view mode.
 */
export const YearViewMode = () => {

  const {
    _calendarDate,
    _setViewMode,
    onYearSelectHandler,
    onPreviousDecadeClickHandler,
    onNextDecadeClickHandler,
  } = useDatePicker();


  return (
    <Box width='325px'>
      <Flex
        style={{
          flexWrap: 'wrap',
          columnGap: '8px',
          rowGap: '8px',
        }}
        p={2}
      >
        {Array.from(
          { length: 12 },
          (_, index) => parseInt(_calendarDate.split('-')[0]) - 1 + index,
        ).map((year, index) => {
          const splited_calendar_date = _calendarDate.split('-');
          const new_date = fromCalendarEngine.stitch_date({
            year: year,
            month: splited_calendar_date[1],
            day: 1,
          });

          const isFirstButton = index === 0;
          const isLastButton = index === 11;
          const isnotFocus = isFirstButton || isLastButton;
          const isDisabled = year > fromCalendarEngine.maxADYear || year < fromCalendarEngine.minADYear;

          return (
            <Button
              key={index}
              size={'sm'}
              variant='unstyled'
              color='black'
              isDisabled={isDisabled}
              _hover={
                !isnotFocus && !isDisabled
                  ? { color: '#0875e1', bg: 'gray.100' }
                  : { bg: 'gray.100' }
              }
              onClick={() => {
                if (isFirstButton) {
                  onPreviousDecadeClickHandler();
                } else if (isLastButton) {
                  onNextDecadeClickHandler();
                } else {
                  onYearSelectHandler(new_date);
                  _setViewMode(fromCalendarEngine.VIEW_MODE.MONTH);
                }
              }}
              style={{
                flex: '0 0 calc(33.33% - 8px)',
                boxSizing: 'border-box',
                padding: '4px',
                cursor: 'pointer',
                opacity: isnotFocus || isDisabled ? 0.6 : 1,
              }}
            >
              <If condition={false}>
                <Then>
                  <Text fontWeight='400'>{englishToNepaliNumber(year)}</Text>
                </Then>
                <Else>
                  <Text fontWeight='400'>{year}</Text>
                </Else>
              </If>
            </Button>
          );
        })}
      </Flex>
    </Box>
  );
};

export default YearViewMode;
