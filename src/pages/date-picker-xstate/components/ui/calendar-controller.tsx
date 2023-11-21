import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface CalendarControllerProps {
  state: any,
  send: any,
  styles: any
}

export const CalendarController = ({
  state,
  send,
  styles
}: CalendarControllerProps) => {
  return <Flex
    sx={styles.calendar_controller.panel}
  >
    <Flex gap={1}>
      <Button
        id="previous-year-button"
        sx={styles.calendar_controller.year_button}
        variant='link'
        onClick={() => {
          send("on_previous_year_click")
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
          send("on_previous_month_click")
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
          send("on_month_view_mode_click")
        }}
        _hover={{ color: '#0875e1', bg: 'gray.100' }}
      >
        <Text p={2} fontSize='16px' fontWeight='600'>
          {state.context.calendar_controller_labels.month_label}
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
          send("on_year_view_mode_click")
        }}
        _hover={{ color: '#0875e1', bg: 'gray.100' }}
      >
        <Text p={2} fontSize='16px' fontWeight='600'>
          {state.context.calendar_controller_labels.year_label}
        </Text>
      </Button>
    </Flex>

    <Flex gap={1}>
      <Button
      id='next-month-button'
        sx={styles.calendar_controller.month_button}
        variant='link'
        onClick={() => {
          send("on_next_month_click")
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
          send("on_next_year_click")
        }}
      // isDisabled={_selected + 1 > fromCalendarEngine.maxADYear}
      >
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  </Flex>;
};
