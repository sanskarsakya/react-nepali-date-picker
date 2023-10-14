import { When } from 'react-if';
import { CALENDAR_MODE } from './calendar-engine';
import { DatePicker } from './date-picker';
import { NepaliDatePicker } from './nepali-datepicker';

export const RigoNepaliDatePicker = (props: any) => {
  return (
    <>
      <When condition={props.dateType === CALENDAR_MODE.ENGLISH}>
        <DatePicker {...props} />
      </When>
      {/* <When condition={props.dateType === CALENDAR_MODE.NEPALI}>
        <NepaliDatePicker {...props} />
      </When> */}
    </>
  );
};
