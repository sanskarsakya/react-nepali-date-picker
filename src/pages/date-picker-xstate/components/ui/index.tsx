import { Box, Code, Text } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import React from 'react';
import { When } from 'react-if';
import { mergedMachine } from '../machines/date-picker-merged-machine';
import { CalendarController } from './calendar-controller';
import { DateInput } from './date-input';
import { DatePickerBody } from './date-picker-body';
import { MonthViewMode } from './month-view-mode';
import { MonthYearPanel } from './month-year-panel';
import { get_base_styles } from './style';
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
  is_nepali?: boolean
}
export const DatepickerComponent = (props: DatepickerComponentProps) => {
  const { isRhfBound = false, onChange, is_dark = false, ...propsRest } = props

  const [
    state,
    send,
  ] = useMachine(mergedMachine);

  const nepaliDatePickerWrapper = React.useRef<HTMLDivElement>(null);

  const styles = get_base_styles(is_dark)

  // FUNCTIONS
  React.useEffect(() => {
    if (props) {
      send("on_mount", {
        data: props
      })
    }
  }, [])
  
  React.useEffect(() => {
    if (props) {
      send("on_props_change", {
        data: props
      })
    }
  }, [props, send])

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
    if ((state.matches("english.Calendar Picker.day_view_mode") || state.matches("nepali.Calendar Picker.day_view_mode")) && nepaliDatePickerWrapper.current) {
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
    <>

      <pre>
        {JSON.stringify({
        state: state.value,
        // context: state.context,
      }, null, 2)}
      </pre>
      
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
        <Box sx={styles.panel}
          style={{
            top: 40,
          }}>
          <When condition={state.matches("english.Calendar Picker.year_view_mode") || state.matches("nepali.Calendar Picker.year_view_mode")}>
            <YearViewMode state={state} send={send} styles={styles} />
          </When>

          <When condition={state.matches("english.Calendar Picker.month_view_mode") || state.matches("nepali.Calendar Picker.month_view_mode")}>
            <MonthViewMode state={state} send={send} styles={styles} />
          </When>

          <When condition={state.matches("english.Calendar Picker.day_view_mode") || state.matches("nepali.Calendar Picker.day_view_mode")}>
            <CalendarController state={state} send={send} styles={styles} />
            <MonthYearPanel state={state} styles={styles} />
            <DatePickerBody state={state} send={send} onChange={onChange} styles={styles} />
            <Today send={send} state={state} onChange={onChange} styles={styles} />
          </When>

        </Box>

      </div>
    </>

  )
}

interface DatePickerXStateProps extends Record<string, any> {
  isRhfBound?: boolean
  is_nepali?: boolean
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


