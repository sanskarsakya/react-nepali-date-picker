import { useDatePicker } from './use-date-picker';
// import { RigoNepaliDatePicker } from './components/nepali-date-picker copy';
// import { CALENDAR_MODE } from './components/nepali-date-picker copy/calendar-engine';
import { DatePickerXState } from './components/ui';

export const RigoUncontrolledComponent = (props: any) => {
  const {
    isRhfBound = false,
    onChangeRHF,
    value: rhfValue,
    // ...propRest
  } = props;

  const context= useDatePicker();

  const {
    name,
    value,
    // label,
    // control,
    // errors,
    // required,
    // rule,
    // this is user defined value for uncontrolled component
    onChange: _onChange,
    // dateType = CALENDAR_MODE.ENGLISH,
    ...contextRest
  }  = context

  const handleChange = (value: any) => {
    _onChange?.(name, value);
    onChangeRHF?.(value);
  };

  const valueNormalized = rhfValue ?? value;

  return <DatePickerXState
    isRhfBound={isRhfBound}
    isNepali={false}
    onChange={handleChange}
    date={valueNormalized}
    {...contextRest}
  />;
};
