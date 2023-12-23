import React from "react";
import { RigoNepaliDatePickerContext } from "./rigo-nepali-date-picker-context";

export const useDatePicker = () => {
  const context = React.useContext(RigoNepaliDatePickerContext);
  if (context === undefined) {
    throw new Error("useDatePicker must be used within a <NepaliDatePickerv2 />");
  }
  return context;
};
