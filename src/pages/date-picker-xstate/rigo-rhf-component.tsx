// import { isEmpty } from "lodash";
// import * as fromFormHelpers from "../@form-helper";
import { Controller } from "react-hook-form";

import { ControlledComponentProps } from "./interface";
import { RigoUncontrolledComponent } from "./rigo-uncontrolled-component";
import { useDatePicker } from "./use-date-picker";

export const RigoRhfComponent = (props: ControlledComponentProps) => {
  const { control,
    // rule,
    // required,
    name,
    disableDateAfter, disableDateBefore } = useDatePicker();

  // let _rule: any = fromFormHelpers.getDefaultRules({ required });

  // if (!isEmpty(rule)) {
  //   _rule = fromFormHelpers.deepMerge(_rule, rule);
  // }

  console.log({
    disableDateBefore,
    disableDateAfter
  })

  return (
    <Controller
      control={control}
      name={name}
      // rules={{
      //   required: {
      //     value: !!required,
      //     message: 'Required',
      //   },
      //   validate: (value: string) => {

      //     if (!isCorrectlyFormatted(value)) {
      //       return "Invalid Format";
      //     }
      //     if (!isDateValid(value)) {
      //       return "Invalid Date";
      //     }

      //     const isValid = handleValidation(value, disableDateBefore as string, disableDateAfter as string)
      //     if (!isValid) {
      //       return "This date is out of range";
      //     }
      //     return true;
      //   }
      // }}
      render={({ field: { onChange, value } }) => (
        <RigoUncontrolledComponent
          value={value}
          isBoundToRHF={true}
          // setError={setError}
          onChangeRHF={onChange}
          {...props}
        />
      )}
    />
  );
};
