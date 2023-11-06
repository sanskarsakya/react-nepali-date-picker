import React from "react";
import { InputTextProps } from "./interface";

export const RigoNepaliDatePickerContext = React.createContext<InputTextProps>({
  label: "Sample label",
  name: "",
  control: undefined,
  setError: undefined,
  errors: undefined,
  required: false,
  rule: undefined,
  value: "",
  onChange: undefined,
});
RigoNepaliDatePickerContext.displayName = "RigoInputTextContext";
