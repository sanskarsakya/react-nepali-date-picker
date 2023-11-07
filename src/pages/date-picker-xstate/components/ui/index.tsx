import { Text } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import React from 'react';
import { When } from 'react-if';
import { CalendarController } from './calendar-controller';
import { DateInput } from './date-input';
import { DatePickerBody } from './date-picker-body';
import { machine } from '../machines/date-picker-machine';
import { MonthViewMode } from './month-view-mode';
import { MonthYearPanel } from './month-year-panel';
import Today from './today';
import { YearViewMode } from './year-view-mode';

export const childOf = (childNode: any, parentNode: any): boolean =>
  parentNode.contains(childNode);

interface DatepickerComponentProps {
  // date: string
  onChange?: any
  isRhfBound?: boolean
  isNepali?: boolean
  date?: string
  disable_date_before?: string
  disable_date_after?: string
}
export const DatepickerComponent = (props: DatepickerComponentProps) => {
  const { isRhfBound = false, onChange, ...propsRest } = props
  const [
    state,
    send,
  ] = useMachine(machine);
  const nepaliDatePickerWrapper = React.useRef<HTMLDivElement>(null);

  // FUNCTIONS
  React.useEffect(() => {
    if (propsRest) {
      send("sync_props", {
        data: { ...propsRest }
      })
    }
  },
  [] 
  // [propsRest.date, propsRest.disable_date_after, propsRest.disable_date_before, send]
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
        width: '275px',
        position: 'relative',
      }}
      ref={nepaliDatePickerWrapper}
    >

      <DateInput state={state} send={send} onChange={onChange} />
      <When condition={!isRhfBound && state.context.error}>
        <Text>{state.context.error}</Text>
      </When>
      <div style={{
        width: '100%',
        background: "white",
        zIndex: 100,
        position: "absolute",
        top: 40,
        left: 0,
      }}>
        <When condition={state.matches({ "calendar_body_opened": "year_view_mode" })}>
          <YearViewMode state={state} send={send} />
        </When>
        <When condition={state.matches({ "calendar_body_opened": "month_view_mode" })}>
          <MonthViewMode state={state} send={send} />
        </When>
        <When condition={state.matches({ "calendar_body_opened": "day_view_mode" })}>
          <CalendarController state={state} send={send} />
          <MonthYearPanel state={state} />
          <DatePickerBody state={state} send={send} onChange={onChange} />
          <Today send={send} state={state} onChange={onChange} />
        </When>
      </div>

    </div>
  )
}

interface DatePickerXStateProps {
  isRhfBound?: boolean
  isNepali?: boolean
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


