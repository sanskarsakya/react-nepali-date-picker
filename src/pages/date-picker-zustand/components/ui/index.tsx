import { Box, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { When } from 'react-if';
import { CalendarController } from './calendar-controller';
import { DateInput } from './date-input';
import { DatePickerBody } from './date-picker-body';
import { MonthViewMode } from './month-view-mode';
import { MonthYearPanel } from './month-year-panel';
import { get_base_styles } from './style';
import Today from './today';
import { YearViewMode } from './year-view-mode';
import { Store, useStore } from '../store/context';

export const childOf = (childNode: any, parentNode: any): boolean =>
  parentNode.contains(childNode);


let coo = 0;
let poo = 0;

interface DatepickerComponentProps extends Record<string, any> {
  onChange?: any
  isRhfBound?: boolean
  isNepali?: boolean
  date?: string
  isDark?: boolean
  disableDateBefore?: string
  disableDateAfter?: string
  disabled?: boolean

}
export const DatepickerComponent = (props: DatepickerComponentProps) => {

  // VARIABLES
  const { isRhfBound = false, disabled, isDark = false } = props

  // HOOKS
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mountSetup, toggleContext, openCalendar, viewMode, error, propsDateChange } = useStore((state:any) => ({
    mountSetup: state.mountSetup,
    openCalendar: state.openCalendar,
    viewMode: state.viewMode,
    error: state.error,
    toggleContext: state.toggleContext,
    propsDateChange: state.propsDateChange,
  }))


  const nepaliDatePickerWrapper = React.useRef<HTMLDivElement>(null);

  const styles = get_base_styles(isDark)

  // FUNCTIONS
  // CHANGE HANDLER
  const handleMountSetup = () => {
    console.log("mount setup")
    if (props) {
      console.log({ props })
      mountSetup(props, onClose);
    }
  }

  const handleIsNepaliPropsChange = () => {
    if (coo !== 0) {
      console.log("is Nepali props change")
      toggleContext(props.isNepali)
    }
    coo++
  };
  
  const handleDatePropsChange = () => {
    if (poo !== 0) {
      console.log("date props change")
      propsDateChange(props.date)
    }
    poo++
  };

  React.useEffect(handleMountSetup, [])
  // React.useEffect(handleDatePrposChange, [props.date])
  React.useEffect(handleIsNepaliPropsChange, [props.isNepali])
  React.useEffect(handleDatePropsChange, [props.date])


  const handleClickOutside = React.useCallback((event: any) => {
    if (nepaliDatePickerWrapper.current &&
      childOf(event.target, nepaliDatePickerWrapper.current)) {
      return;
    }
    onClose()
  }, [onClose]);

  React.useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  React.useLayoutEffect(() => {
    if (isOpen && nepaliDatePickerWrapper.current) {
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
  }, [isOpen]);

  return (
    <>

      <div
        id={'input-wrapper-2'}
        style={{
          position: 'relative',
        }}
        ref={nepaliDatePickerWrapper}
      >
        <DateInput
          onOpen={() => {
            openCalendar()
            onOpen()
          }}
          disabled={disabled}
          styles={styles}
        />
        <When condition={!isRhfBound && error} >
          <Text color="red.300">{error}</Text>
        </When>

        {/* RENDER CALENDAR BODY */}
        <Box sx={styles.panel}
          style={{
            top: 40,
          }}>
          <When condition={isOpen && viewMode === "YEAR_VIEW"}>
            <YearViewMode styles={styles} />
          </When>

          <When condition={isOpen && viewMode === "MONTH_VIEW"}>
            <MonthViewMode styles={styles} />
          </When>

          <When condition={isOpen && viewMode === "CALENDAR_VIEW"}>
            <CalendarController styles={styles} />
            <MonthYearPanel styles={styles} />
            <DatePickerBody styles={styles} />
            <Today styles={styles} />
          </When>

        </Box>

      </div>
    </>

  )
}

interface Props extends Record<string, any> {
  isRhfBound?: boolean
  isNepali?: boolean
  isDark?: boolean
  onChange?: any
  date?: string
  disableDateBefore?: string
  disableDateAfter?: string
  disabled?: boolean
}
export const DatePicker = (props: Props) => {

  return <Store>
    <DatepickerComponent
      {...props}
    />
  </Store>
}



// Rule of thumb
// mount setup
// state setter => should not fire event which will case the loop
// events trigger


