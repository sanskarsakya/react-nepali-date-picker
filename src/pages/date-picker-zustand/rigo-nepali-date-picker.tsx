import React from "react";
import { InputTextProps } from "./interface";
import { RigoNepaliDatePickerContext } from "./rigo-nepali-date-picker-context";

export const RigoNepaliDatePicker = (props: InputTextProps) => {
  const { children, ...rest } = props
  return (
    <>
     
      <RigoNepaliDatePickerContext.Provider
        value={{
          ...rest,
        }}
      >
        {children}
      </RigoNepaliDatePickerContext.Provider>
    </>
  );
};

