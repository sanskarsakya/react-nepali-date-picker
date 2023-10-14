import React from 'react';
import { Flex, Text, Tbody, Tr, Td } from '@chakra-ui/react';
import { get_styles } from '../style';
import * as fromCalendarEngine from '../calendar-engine';
import { englishToNepaliNumber } from 'nepali-number';
import { If, Then, Else } from 'react-if';
import { useDatePicker } from '../date-picker/useDatePicker';
import dayjs from 'dayjs';

export const DatePickerBody = () => {
  
  const {
    onSelectDateHandler,
    is_dark,
    disableDateBefore,
    disableDateAfter,
    _calendarDates,
  } = useDatePicker();


  const Styles = get_styles(is_dark);

  const handleDaySelection = (dayInfo: any) => {
    const selectedDate = new Date(
      dayInfo.primaryYear,
      dayInfo.primaryMonth - 1,
      dayInfo.primaryDay,
    );
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    onSelectDateHandler(formattedDate);
  };

  const [disableYearBefore, disableMonthBefore, disableDayBefore] =
    disableDateBefore ? disableDateBefore.split('-') : [];
  const [disableYearAfter, disableMonthAfter, disableDayAfter] =
    disableDateAfter ? disableDateAfter.split('-') : [];

  const disableYearBeforeInt = parseInt(disableYearBefore);
  const disableMonthBeforeInt = parseInt(disableMonthBefore);
  const disableDayBeforeInt = parseInt(disableDayBefore);
  const disableYearAfterInt = parseInt(disableYearAfter);
  const disableMonthAfterInt = parseInt(disableMonthAfter);
  const disableDayAfterInt = parseInt(disableDayAfter);

  return (
    <Tbody>
      {_calendarDates.map(
        (calendarDate: fromCalendarEngine.IDayInfo[], weekRowIdx: number) => {
          return (
            <Tr key={`week-row-${weekRowIdx}`}>
              {calendarDate.map(
                (dayInfo: fromCalendarEngine.IDayInfo, weekDayIdx: number) => {
                  const renderedYear = dayInfo.primaryYear;
                  const renderedMonth = dayInfo.primaryMonth;
                  const renderedDay = dayInfo.primaryDay;

                  const isDisabledBefore =
                    renderedYear < disableYearBeforeInt ||
                    (renderedYear === disableYearBeforeInt &&
                      renderedMonth < disableMonthBeforeInt) ||
                    (renderedYear === disableYearBeforeInt &&
                      renderedMonth === disableMonthBeforeInt &&
                      renderedDay < disableDayBeforeInt);

                  const isDisabledAfter =
                    renderedYear > disableYearAfterInt ||
                    (renderedYear === disableYearAfterInt &&
                      renderedMonth > disableMonthAfterInt) ||
                    (renderedYear === disableYearAfterInt &&
                      renderedMonth === disableMonthAfterInt &&
                      renderedDay > disableDayAfterInt);

                  const sx = {
                    p: 2,
                    ...(dayInfo.isSelected &&
                      dayInfo.isCurrentMonth && { ...Styles.selected }),
                    ...(dayInfo.isToday && { ...Styles.today }),
                    ...(dayInfo.isToday && dayInfo.isSelected && { ...Styles.todayselected }),
                    ...(dayInfo.isCurrentMonth
                      ? { ...Styles.current }
                      : { ...Styles.disabled }),
                    ...(isDisabledBefore && { ...Styles.disabled }),
                    ...(isDisabledAfter && { ...Styles.disabled }),
                  };
                  return (
                    <Td
                      key={`week-day-${weekDayIdx}`}
                      sx={sx}
                      onClick={() => {
                        if (
                          dayInfo.isCurrentMonth &&
                          !isDisabledAfter &&
                          !isDisabledBefore
                        ) {
                          handleDaySelection(dayInfo);
                        }
                      }}
                    >
                      <Flex gap={'3px'}>
                        <If condition={false}>
                          <Then>
                            <Text fontSize={'14px'}>
                              {englishToNepaliNumber(dayInfo.primaryDay)}
                            </Text>
                            <Text pt='1px' fontSize={'11px'}>
                              {dayInfo.secondaryDay}
                            </Text>
                          </Then>
                          <Else>
                            <Text fontSize={'14px'}>{dayInfo.primaryDay}</Text>
                            <Text pt='1px' fontSize={'11px'}>
                              {englishToNepaliNumber(dayInfo.secondaryDay)}
                            </Text>
                          </Else>
                        </If>
                      </Flex>
                    </Td>
                  );
                },
              )}
            </Tr>
          );
        },
      )}
    </Tbody>
  );
};
