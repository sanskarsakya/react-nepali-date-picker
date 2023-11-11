import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface CalendarControllerProps {
  state: any,
  send: any,
  styles: any
}

export const CalendarController = ({
  state,
  send
}: CalendarControllerProps) => {
  return <Flex w="full" justifyContent='space-between' p={1} pt={3}>
    <Flex gap={1}>
      <Button
        size='xs'
        px={3}
        _hover={{ bg: 'gray.100' }}
        variant='link'
        onClick={() => {
          send("on_previous_year_click")
        }}
      // isDisabled={_selected - 1 < fromCalendarEngine.minADYear}
      >
        <AiOutlineDoubleLeft color='black' />
      </Button>
      <Button
        size='xs'
        px={3}
        variant='link'
        _hover={{ bg: 'gray.100' }}
        onClick={() => {
          send("on_previous_month_click")
        }}
      // isDisabled={_selected + 1 < fromCalendarEngine.minADYear}
      >
        <AiOutlineLeft color='black' />
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
        size='xs'
        px={3}
        _hover={{ bg: 'gray.100' }}
        variant='link'
        onClick={() => {
          send("on_next_month_click")
        }}
      // isDisabled={_selected > fromCalendarEngine.maxADYear}
      >
        <AiOutlineRight color='black' />
      </Button>
      <Button
        size='xs'
        px={3}
        _hover={{ bg: 'gray.100' }}
        variant='link'
        onClick={() => {
          send("on_next_year_click")
        }}
      // isDisabled={_selected + 1 > fromCalendarEngine.maxADYear}
      >
        <AiOutlineDoubleRight color='black' />
      </Button>
    </Flex>
  </Flex>;
};
