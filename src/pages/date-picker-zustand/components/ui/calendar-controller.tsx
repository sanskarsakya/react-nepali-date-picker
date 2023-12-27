import { Button, Center, Flex, IconButton, Text } from '@chakra-ui/react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useStore } from '../store/context';

interface CalendarControllerProps {
  styles: any
}

export const CalendarController = ({
  styles
}: CalendarControllerProps) => {

  return <Flex
    w="full"
    justifyContent="space-between"
    sx={styles.calendar_controller.panel}
  >
    <Flex >
      <PreviousYearButton />
      <PreviousMonthButton />
    </Flex>

    <Flex >
      <MonthButton />
      <Center>
        <Text fontSize='16px' fontWeight='600'>
          -
        </Text>
      </Center>
      <YearButton />
    </Flex>

    <Flex >
      <NextMonthButton />
      <NextYearButton />
    </Flex>
  </Flex>;

};

export const PreviousYearButton = () => {
  const previousYear = useStore((state:any) => state.previousYear)

  return <IconButton
    aria-label='previous-year-button'
    id="previous-year-button"
    bg="transparent"
    _hover={{
      bg: "transparent"
    }}
    icon={<AiOutlineDoubleLeft />}
    onClick={previousYear}
  />;
}


export const PreviousMonthButton = () => {
  const previousMonth = useStore((state:any) => state.previousMonth);

  return (
    <IconButton
      aria-label='previous-month-button'
      id="previous-month-button"
      bg="transparent"
      _hover={{
        bg: "transparent"
      }}
      icon={<AiOutlineLeft />}
      onClick={previousMonth}
    // isDisabled={_selected + 1 < fromCalendarEngine.minADYear}
    />
  );
};

export const NextMonthButton = () => {
  const nextMonth = useStore((state:any) => state.nextMonth);

  return (
    <IconButton
      aria-label='next-month-button'
      id='next-month-button'
      bg="transparent"
      _hover={{
        bg: "transparent"
      }}
      icon={<AiOutlineRight />}
      onClick={nextMonth}
    // isDisabled={_selected > fromCalendarEngine.maxADYear}
    />
  );
};


export const NextYearButton = () => {
  const nextYear = useStore((state:any) => state.nextYear);

  return (
    <IconButton
      aria-label='next-year-button'
      id='next-year-button'
      bg="transparent"
      _hover={{
        bg: "transparent"
      }}
      icon={<AiOutlineDoubleRight />}
      onClick={nextYear}
    // isDisabled={_selected + 1 > fromCalendarEngine.maxADYear}
    />
  );
};


export const MonthButton = () => {
  const {
    controlledLabel,
    goToMonthView,
  } = useStore((state:any) => ({
    controlledLabel: state.controllerLabel,
    goToMonthView: state.goToMonthView,
  }))

  return (
    <Button
      variant='unstyled'
      px={1}
      _hover={{ color: '#0875e1', bg: 'gray.100' }}
      onClick={goToMonthView}
    >
      <Text fontSize='sm' fontWeight='medium'>
        {controlledLabel.month}
      </Text>
    </Button>
  );
};

export const YearButton = () => {
  const {
    controlledLabel,
    goToYearView,
  } = useStore((state:any) => ({
    controlledLabel: state.controllerLabel,
    goToYearView: state.goToYearView,
  }))

  return (
    <Button
      variant='unstyled'
      px={1}
      _hover={{ color: '#0875e1', bg: 'gray.100' }}
      onClick={goToYearView}
    >
      <Text fontSize='sm' fontWeight='medium'>
        {controlledLabel.year}
      </Text>
    </Button>
  );
};
