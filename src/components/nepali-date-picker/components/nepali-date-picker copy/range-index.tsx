import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { RigoNepaliDatePicker } from '.';
import { AiOutlineDown } from 'react-icons/ai';
import * as fromCalendarEngine from './calendar-engine';
import { CALENDAR_MODE } from './calendar-engine';
import { When } from 'react-if';
import dayjs from 'dayjs';
import { ADToBS } from 'bikram-sambat-js';

const get_this_week_start_end_date = () => {
  // Get the current date
  const currentDate = dayjs();

  // Calculate the start of the week (Sunday)
  const startOfWeek = currentDate.startOf('week').format('YYYY-MM-DD');
  const startOfWeekInNepali = ADToBS(startOfWeek);

  // Calculate the end of the week (Saturday)
  const endOfWeek = currentDate.endOf('week').format('YYYY-MM-DD');
  const endOfWeekInNepali = ADToBS(endOfWeek);

  return {
    startOfWeek: startOfWeek,
    endOfWeek: endOfWeek,
  };
};

const get_next_month_start_end_date = () => {
  // Get the current date
  const currentDate = dayjs();

  // Calculate the start of the next month
  const startOfNextMonth = currentDate.add(1, 'month').startOf('month');

  // Calculate the end of the next month
  const endOfNextMonth = currentDate.add(1, 'month').endOf('month');

  return {
    start: startOfNextMonth.format('YYYY-MM-DD'),
    end: endOfNextMonth.format('YYYY-MM-DD'),
  };
};

const get_this_month_start_end_date = () => {
  // Get the current date
  const currentDate = dayjs();

  // Calculate the start of the week (Sunday)
  const startDate = currentDate.startOf('month');

  // Calculate the end of the week (Saturday)
  const endDate = currentDate.endOf('month');

  return {
    start: startDate.format('YYYY-MM-DD'),
    end: endDate.format('YYYY-MM-DD'),
  };
};

const get_this_year_start_end_date = () => {
  const currentDate = dayjs();
  const startDate = currentDate.startOf('year');
  const endDate = currentDate.endOf('year');

  return {
    start: startDate.format('YYYY-MM-DD'),
    end: endDate.format('YYYY-MM-DD'),
  };
};

export const RenderRangeInput = (args: any) => {
  const args1 = args;
  const args2 = args;
  const [startDate, setStartDate] = useState(args.date);
  const [endDate, setEndDate] = useState(args.date);
  const [isDateRangeValid, setDateRangeValid] = useState<boolean>(true);

  const handleStartDateChange = (newDate: string) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = dateFormat.test(newDate);
    if (isValid) {
      setStartDate(newDate);

      const isDateRangeValid = fromCalendarEngine.validateDateRange(
        newDate,
        endDate,
      );

      if (isDateRangeValid) {
        setDateRangeValid(true);
      } else {
        setDateRangeValid(false);
      }
      console.log('Start date:', newDate);
    } else {
      console.log('Invalid date format');
      setDateRangeValid(false);
    }
  };

  const handleEndDateChange = (newDate: string) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = dateFormat.test(newDate);

    if (isValid) {
      setEndDate(newDate);

      const isDateRangeValid = fromCalendarEngine.validateDateRange(
        startDate,
        newDate,
      );

      if (isDateRangeValid) {
        setDateRangeValid(true);
      } else {
        setDateRangeValid(false);
      }
      console.log('End date:', newDate);
    } else {
      console.log('Invalid date format');
      setDateRangeValid(false);
    }
  };

  const handleThisWeek = () => {
    const { startOfWeek, endOfWeek } = get_this_week_start_end_date();
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
  };
  const handleThisMonth = () => {
    const { start, end } = get_this_month_start_end_date();
    setStartDate(start);
    setEndDate(end);
  };

  const handleThisYear = () => {
    const { start, end } = get_this_year_start_end_date();
    setStartDate(start);
    setEndDate(end);
  };

  const handleNextMonth = () => {
    const { start, end } = get_next_month_start_end_date();
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Box display={'inline-block'}>
      <Flex justifyContent='flex-start'>
        <Box
          id={'input-wrapper-1'}
          // border='1px solid #E1E7EF'
          // borderRight={'none'}
          maxW='175px'
          // borderTopLeftRadius='5px'
          // borderBottomLeftRadius='5px'
        >
          <RigoNepaliDatePicker
            date={startDate}
            dateType={args.dateType}
            calendarDate={startDate}
            is_dark={false}
            onChange={handleStartDateChange}
            disableDateAfter={endDate}
          />
        </Box>
        <Box
          id={'input-wrapper-1'}
          // border='1px solid #E1E7EF'
          maxW='175px'
        >
          <RigoNepaliDatePicker
            date={endDate}
            dateType={args.dateType}
            calendarDate={endDate}
            is_dark={false}
            onChange={handleEndDateChange}
            disableDateBefore={startDate}
          />
        </Box>
        <Menu placement={'bottom-end'}>
          <MenuButton
            border='1px solid #CDD5DF'
            bg='white'
            borderLeft='none'
            _hover={{ bg: 'gray.100' }}
            borderTopRightRadius='4px'
            borderBottomRightRadius='4px'
          >
            <Box px='12px'>
              {/* <AiOutlineDown color='gray'/> */}
              {/* <Icon as={downArrow} color='gray' mt='4px' /> */}
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleThisWeek}>This Week</MenuItem>
            <MenuItem onClick={handleThisMonth}>This Month</MenuItem>
            <MenuItem onClick={handleNextMonth}>Next Month</MenuItem>
            <MenuItem onClick={handleThisYear}>This Year</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <When condition={!isDateRangeValid}>
        <Text mt={2} color={'red.500'}>
          invalid date range
        </Text>
      </When>
    </Box>
  );
};
