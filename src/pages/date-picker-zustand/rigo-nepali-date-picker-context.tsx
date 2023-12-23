import React from "react";

export const RigoNepaliDatePickerContext = React.createContext<any>({
  label: "Sample label",
  name: "",
  control: undefined,
  setError: undefined,
  errors: undefined,
  required: false,
  rule: undefined,
  value: "",
  onChange: undefined,
  is_nepali: false,
});
RigoNepaliDatePickerContext.displayName = "RigoNepaliDatePickerContext";
