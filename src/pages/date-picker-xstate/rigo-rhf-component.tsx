// import { isEmpty } from "lodash";
// import * as fromFormHelpers from "../@form-helper";
import { Controller } from "react-hook-form";

import { ControlledComponentProps } from "./interface";
import { RigoUncontrolledComponent } from "./rigo-uncontrolled-component";
import { useDatePicker } from "./use-date-picker";
import { validate } from "./components/machines/date-picker-machine";
import { validate as NepaliValidator } from "./components/machines/date-picker-nepali-machine";
import { BSToAD } from "bikram-sambat-js";

export const RigoRhfComponent = (props: ControlledComponentProps) => {
  const context = useDatePicker();
  const {
    control,
    required,
    name,
    ...contextProps
  } = context


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

          if (context.is_nepali) {
            const validation_result = NepaliValidator(BSToAD(value), BSToAD(context.disableDateBefore ?? "") as string, BSToAD(context.disableDateAfter ?? "") as string);
            if (!validation_result.is_valid) {
              return validation_result.message
            }
            return true;
          }

          const validation_result = validate(value, context.disableDateBefore as string, context.disableDateAfter as string);
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
          {...contextProps}
          {...props}
        />
      )}
    />
  );
};
