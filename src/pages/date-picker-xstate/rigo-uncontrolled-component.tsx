import { useDatePicker } from './use-date-picker';
// import { RigoNepaliDatePicker } from './components/nepali-date-picker copy';
// import { CALENDAR_MODE } from './components/nepali-date-picker copy/calendar-engine';
import { DatePickerXState } from './components/ui';

export const RigoUncontrolledComponent = (props: any) => {
  const {
    // setError,
    isRhfBound = false,
    // trigger,
    onChangeRHF,
    // value: rhfValue,
    // ...propRest
  } = props;

  const {
    name,
    // value,
    // label,
    // control,
    // errors,
    // required,
    // rule,
    // this is user defined value for uncontrolled component
    onChange: _onChange,
    // dateType = CALENDAR_MODE.ENGLISH,
    // ...contextRest
  } = useDatePicker();

  const handleChange = (value: any) => {
    _onChange?.(name, value);
    onChangeRHF?.(value);
    // setError?.(name, {
    //   message: "errorMessage",
    // })
  };

  // const valueNormalized = rhfValue ?? value;

  // const calendarDate =
  //   dateType === CALENDAR_MODE.NEPALI
  //     ? ADToBS(dayjs().format('YYYY-MM-DD'))
  //     : dayjs().format('YYYY-MM-DD');

  // const inputProps = {
  //   name,
  //   // date: valueNormalized,
  //   // dateType: dateType,
  //   // calendarDate: isEmpty(valueNormalized) ? calendarDate : valueNormalized,
  //   is_dark: false,
  //   ...contextRest,
  //   ...propRest,
  // };

  return <DatePickerXState isRhfBound={isRhfBound} isNepali={false} onChange={handleChange} />;
};
