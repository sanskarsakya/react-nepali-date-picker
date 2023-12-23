import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useCalendarStore } from '../store';

interface CalendarControllerProps {
  styles: any
}

export const CalendarController = ({
  styles
}: CalendarControllerProps) => {
  const {
    controlledLabel,
    nextMonth,
    previousMonth,
    nextYear,
    previousYear,
    goToMonthView,
    goToYearView
  } = useCalendarStore(state => ({
    controlledLabel: state.controllerLabel,
    nextMonth: state.nextMonth,
    previousMonth: state.previousMonth,
    nextYear: state.nextYear,
    previousYear: state.previousYear,
    goToMonthView: state.goToMonthView,
    goToYearView: state.goToYearView
  }))


  return <Flex
    sx={styles.calendar_controller.panel}
  >
    <Flex gap={1}>
      <Button
        id="previous-year-button"
        sx={styles.calendar_controller.year_button}
        variant='link'
        onClick={() => {
          previousYear()
        }}
      // isDisabled={_selected - 1 < fromCalendarEngine.minADYear}
      >
        <AiOutlineDoubleLeft />
      </Button>
      <Button
        id="previous-month-button"
        sx={styles.calendar_controller.month_button}
        variant='link'
        onClick={() => {
          previousMonth()
        }}
      // isDisabled={_selected + 1 < fromCalendarEngine.minADYear}
      >
        <AiOutlineLeft />
      </Button>
    </Flex>

    <Flex gap='2px'>
      <Button
        variant='unstyled'
        onClick={() => {
          goToMonthView()
          // send("on_month_view_mode_click")
        }}
        _hover={{ color: '#0875e1', bg: 'gray.100' }}
      >
        <Text p={2} fontSize='16px' fontWeight='600'>
          {controlledLabel.month}
        </Text>
      </Button>
      <Center>
        <Text fontSize='16px' fontWeight='600'>
          -
        </Text>
      </Center>
      <Button
        variant='unstyled'
        onClick={() => {
          goToYearView()
          // send("on_year_view_mode_click")
        }}
        _hover={{ color: '#0875e1', bg: 'gray.100' }}
      >
        <Text p={2} fontSize='16px' fontWeight='600'>
          {controlledLabel.year}
        </Text>
      </Button>
    </Flex>

    <Flex gap={1}>
      <Button
        id='next-month-button'
        sx={styles.calendar_controller.month_button}
        variant='link'
        onClick={() => {
          nextMonth()
        }}
      // isDisabled={_selected > fromCalendarEngine.maxADYear}
      >
        <AiOutlineRight />
      </Button>
      <Button
        id='next-year-button'
        sx={styles.calendar_controller.year_button}
        variant='link'
        onClick={() => {
          nextYear()
        }}
      // isDisabled={_selected + 1 > fromCalendarEngine.maxADYear}
      >
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  </Flex>;
};
