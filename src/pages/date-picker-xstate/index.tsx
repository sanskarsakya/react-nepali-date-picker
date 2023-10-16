import { Button, Code, Container, Flex } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import { When } from 'react-if';
import { CalendarController } from './calendar-controller';
import { DateInput } from './date-input';
import { DatePickerBody } from './date-picker-body';
import { machine } from './date-picker-machine';
import { MonthViewMode } from './month-view-mode';
import { MonthYearPanel } from './month-year-panel';
import Today from './today';
import { YearViewMode } from './year-view-mode';

// interface DatepickerComponentProps {
//   date: string
//   onChange?: any
// }
export const DatepickerComponent = () => {
  const [
    state,
    send,
  ] = useMachine(machine);

  // React.useEffect(() => {
  //   send("sync_date", {
  //     data: {
  //       date: props.date
  //     }
  //   })
  // }, [props.date, send])

  // React.useEffect(() => {
  //   props?.onChange?.(state.context.calendar_reference_date)
  // }, [state.context.calendar_reference_date])


  // const nepaliDatePickerWrapper = React.useRef<HTMLDivElement>(null);

  // React.useLayoutEffect(() => {
  //   if (state.matches({ "calendar_body_opened": "year_view_mode" })) {
  //     document.addEventListener('mousedown', () => { send("on_outside_click") });
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', () => { send("on_outside_click") });
  //   };
  // }, [state, send]);


  // React.useLayoutEffect(() => {
  //   if (state.matches({ "calendar_body_opened": "year_view_mode" }) && nepaliDatePickerWrapper.current) {
  //     const nepaliDatePicker = nepaliDatePickerWrapper.current.getBoundingClientRect();
  //     const screenHeight = window.innerHeight;

  //     const calender: HTMLDivElement | null = nepaliDatePickerWrapper.current.querySelector('.calender');
  //     if (calender) {
  //       setTimeout(() => {
  //         const calenderHeight = calender.clientHeight;

  //         if (calenderHeight + nepaliDatePicker.bottom > screenHeight) {
  //           if (calenderHeight < nepaliDatePicker.top) {
  //             calender.style.bottom = `${nepaliDatePicker.height}px`;
  //           }
  //         }
  //       }, 0);
  //     }
  //   }
  // }, [state]);


  return (
    <Container as={Flex} direction="column" alignItems="start" minH="100vh" gap={2}>
      <Code>State: {JSON.stringify(state.value, null, 2)}</Code>
      <Code>Date: {JSON.stringify(state.context.date, null, 2)}</Code>
      <Code>Calendar Reference Date: {JSON.stringify(state.context.calendar_reference_date, null, 2)}</Code>
      <Flex alignItems="center" gap={2}>
        <Button size="sm"
          onClick={() => {
            send("open_calendar")
          }}
        >
          open calendar body
        </Button>
        <Button size="sm"
          onClick={() => {
            send("on_outside_click")
          }}
        >
          close calendar body
        </Button>
      </Flex>

      <div
        id={'input-wrapper-2'}
        style={{
          width: '100%',
          position: 'relative',
        }}
        // ref={nepaliDatePickerWrapper}
      >
        <DateInput state={state} send={send} />
        <When condition={state.matches({ "calendar_body_opened": "year_view_mode" })}>
          <YearViewMode state={state} send={send} />
        </When>
        <When condition={state.matches({ "calendar_body_opened": "month_view_mode" })}>
          <MonthViewMode state={state} send={send} />
        </When>
        <When condition={state.matches({ "calendar_body_opened": "day_view_mode" })}>
          <CalendarController state={state} send={send} />
          <MonthYearPanel state={state} />
          <DatePickerBody state={state} send={send} />
          <Today state={state} send={send} />
        </When>
      </div>

    </Container>
  )
}

export const DatePickerXState = () => {
  // const [date, setdate] = React.useState(dayjs().format("YYYY-MM-DD"))
  return <>
    {/* <code>{date}</code> */}
    <DatepickerComponent 
    // date={date} 
    // onChange={(valuedate: string) => {
    //   setdate(valuedate)
    // }}
     />
  </>
}


