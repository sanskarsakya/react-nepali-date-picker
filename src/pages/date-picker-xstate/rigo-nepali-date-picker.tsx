import React from "react";
import { InputTextProps } from "./interface";
import { RigoNepaliDatePickerContext } from "./rigo-nepali-date-picker-context";

export const RigoNepaliDatePicker = (props: InputTextProps) => {
  const { children, ...rest } = props
  const [data, setData] = React.useState(rest)

  return (
    <>
      <pre>   {JSON.stringify({
        in: data.isNepali,
        ddb: data.disableDateBefore,
        dda: data.disableDateAfter,
      }, null, 2)}</pre>
      <RigoNepaliDatePickerContext.Provider
        value={{
          ...data,
          setData
        }}
      >
        {children}
      </RigoNepaliDatePickerContext.Provider>
    </>
  );
};

