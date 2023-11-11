import { Box, Text } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import React from 'react';
import { When } from 'react-if';
import { machine } from '../machines/date-picker-machine';
import { CalendarController } from './calendar-controller';
import { DateInput } from './date-input';
import { DatePickerBody } from './date-picker-body';
import { MonthViewMode } from './month-view-mode';
import { MonthYearPanel } from './month-year-panel';
import { get_styles_base } from './style';
import Today from './today';
import { YearViewMode } from './year-view-mode';

export const childOf = (childNode: any, parentNode: any): boolean =>
  parentNode.contains(childNode);

interface DatepickerComponentProps {
  // date: string
  onChange?: any
  isRhfBound?: boolean
  isNepali?: boolean
  is_dark?: boolean
  date?: string
  disable_date_before?: string
  disable_date_after?: string
}
export const DatepickerComponent = (props: DatepickerComponentProps) => {
  const { isRhfBound = false, onChange, is_dark = false, ...propsRest } = props
  const [
    state,
    send,
  ] = useMachine(machine);
  const nepaliDatePickerWrapper = React.useRef<HTMLDivElement>(null);

  const styles = get_styles_base(is_dark)

  // FUNCTIONS
  React.useEffect(() => {
    if (propsRest) {
      send("sync_props", {
        data: { ...props }
      })
    }
  },[]
  )

  const handleClickOutside = React.useCallback((event: any) => {
    if (nepaliDatePickerWrapper.current &&
      childOf(event.target, nepaliDatePickerWrapper.current)) {
      return;
    }
    send("on_outside_click")
  }, [send]);

  React.useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  React.useLayoutEffect(() => {
    if (state.matches({ "calendar_body_opened": "year_view_mode" }) && nepaliDatePickerWrapper.current) {
      const nepaliDatePicker = nepaliDatePickerWrapper.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      const calender: HTMLDivElement | null = nepaliDatePickerWrapper.current.querySelector('.calender');
      if (calender) {
        setTimeout(() => {
          const calenderHeight = calender.clientHeight;

          if (calenderHeight + nepaliDatePicker.bottom > screenHeight) {
            if (calenderHeight < nepaliDatePicker.top) {
              calender.style.bottom = `${nepaliDatePicker.height}px`;
            }
          }
        }, 0);
      }
    }
  }, [state]);

  return (
    <div
      id={'input-wrapper-2'}
      style={{
        // width: '275px',
        position: 'relative',
      }}
      ref={nepaliDatePickerWrapper}
    >

      <DateInput state={state} send={send} onChange={onChange} styles={styles} />
      <When condition={!isRhfBound && state.context.error} >
        <Text>{state.context.error}</Text>
      </When>

      {/* RENDER CALENDAR BODY */}
      <Box
      shadow="md"
      style={{
        width: '288px',
        background: "white",
        zIndex: 100,
        position: "absolute",
        top: 40,
        left: 0,
      }}>
        <When condition={state.matches({ "calendar_body_opened": "year_view_mode" })}>
          <YearViewMode state={state} send={send} styles={styles} />
        </When>

        <When condition={state.matches({ "calendar_body_opened": "month_view_mode" })}>
          <MonthViewMode state={state} send={send} styles={styles} />
        </When>

        <When condition={state.matches({ "calendar_body_opened": "day_view_mode" })}>
          <CalendarController state={state} send={send} styles={styles} />
          <MonthYearPanel state={state} styles={styles} />
          <DatePickerBody state={state} send={send} onChange={onChange} styles={styles} />
          <Today send={send} state={state} onChange={onChange} styles={styles} />
        </When>

      </Box>

    </div>
  )
}

interface DatePickerXStateProps {
  isRhfBound?: boolean
  isNepali?: boolean
  isDark?: boolean
  onChange?: any
  date?: string
  disable_date_before?: string
  disable_date_after?: string
}
export const DatePickerXState = (props: DatePickerXStateProps) => {
  return <DatepickerComponent
    {...props}
  />
}


