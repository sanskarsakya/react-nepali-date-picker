// import { isEmpty } from "lodash";
// import * as fromFormHelpers from "../@form-helper";
import { Controller } from "react-hook-form";

import { ControlledComponentProps } from "./interface";
import { RigoUncontrolledComponent } from "./rigo-uncontrolled-component";
import { useDatePicker } from "./use-date-picker";
import { validate } from "./components/machines/date-picker-machine";

export const RigoRhfComponent = (props: ControlledComponentProps) => {
  const {
    control,
    required,
    name,
    disableDateAfter,
    disableDateBefore
  } = useDatePicker();


  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {
          value: !!required,
          message: 'Required',
        },
        validate: (value: string) => {

          const validation_result = validate(value, disableDateBefore as string, disableDateAfter as string);
          if (!validation_result.is_valid) {
            return validation_result.message
          }
          return true;
        }
      }}
      render={({ field: { onChange, value } }) => (
        <RigoUncontrolledComponent
          value={value}
          isRhfBound={true}
          // setError={setError}
          onChangeRHF={onChange}
          {...props}
        />
      )}
    />
  );
};
