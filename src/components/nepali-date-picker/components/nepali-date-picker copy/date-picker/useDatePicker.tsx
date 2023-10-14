import * as React from 'react';
import { DatePickerContext } from './DatePickerContext';

// =======================

export const useDatePicker = () => {
  // mark 1
  const context = React.useContext(DatePickerContext);
  if (context === undefined) {
    throw new Error(
      'useDatePicker must be used within a <RigoEnglishDatePickerContextWrapper />'
    );
  }
  return context;
};
