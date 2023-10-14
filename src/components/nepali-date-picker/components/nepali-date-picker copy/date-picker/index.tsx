// libs
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// calendar engine
import * as fromCalendarEngine from '../calendar-engine';

// styles

// ui
import { EnglishDatePickerContextWrapper } from './EnglishDatePickerContextWrapper';
import { DatePickerComponent } from './DatePickerComponent';
import { DatePickerContext } from './DatePickerContext';

dayjs.extend(customParseFormat);

export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;


export const childOf = (childNode: any, parentNode: any): boolean =>
  parentNode.contains(childNode);

DatePickerContext.displayName = 'DatePickerContext';

export interface EnglishDatePickerProps {
  date: string;
  calendarDate: fromCalendarEngine.type_calendar_mode;
  dateType: string;
  is_dark?: boolean;
  disableDateBefore?: string;
  disableDateAfter?: string;
  onChange: (newDate: string) => void;
}

export const DatePicker = (props: EnglishDatePickerProps) => {
  return (
    <>
      <EnglishDatePickerContextWrapper {...props}>
        <DatePickerComponent />
      </EnglishDatePickerContextWrapper>
    </>
  );
};