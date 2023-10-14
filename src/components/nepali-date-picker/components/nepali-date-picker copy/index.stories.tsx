import type { Meta } from '@storybook/react';
import { DatePicker } from './date-picker';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { CALENDAR_MODE } from './calendar-engine';
import { RigoNepaliDatePicker } from '.';
import { RenderRangeInput } from './range-index';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'V2/Forms/Date Picker v2',
};

export default meta;

export const Default = {
  args: {
    date: '2023-09-15',
    dateType: CALENDAR_MODE.ENGLISH,
    calendarDate: '2023-09-15',
    is_dark: false,
    disableDateBefore: '2023-9-02',
    disableDateAfter:'2023-09-29',
  },
  argTypes: {
    dateType: {
      options: [CALENDAR_MODE.ENGLISH, CALENDAR_MODE.NEPALI],
      control: { type: 'radio' },
    },
    is_dark: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
  render: (args: any) => {
    const handleChange = (newDate: string) => {
      const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
      const isValid = dateFormat.test(newDate);
      if (isValid) {
        console.log('New date:', newDate);
      }
    };

    return (
      <ChakraProvider>
        <Box
          id={'input-wrapper-1'}
          // border='1px solid #E1E7EF'
          // borderRadius='5px'
          maxW='175px'
        >
          <RigoNepaliDatePicker {...args} onChange={handleChange} />
        </Box>
      </ChakraProvider>
    );
  },
};

export const Range = {
  args: {
    date: '2023-08-15',
    endDate: '2023-09-15',
    dateType: CALENDAR_MODE.ENGLISH,
    calendarDate: '2023-08-15',
    is_dark: false,
  },
  argTypes: {
    dateType: {
      options: [CALENDAR_MODE.ENGLISH, CALENDAR_MODE.NEPALI],
      control: { type: 'radio' },
    },
    is_dark: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
  render: (args: any) => {
    return (
      <ChakraProvider>
        <RenderRangeInput {...args} />
      </ChakraProvider>
    );
  },
};
