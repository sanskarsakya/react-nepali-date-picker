import * as fromFormHelpers from "../@form-helper";
import FormErrorLable from "../form-error-lable";
import { FormErrorLabelProps } from "./interface";
import { useDatePicker } from "./use-date-picker";

export const RigoFormErrorLabel = (props: FormErrorLabelProps) => {
  const context = useDatePicker();

  const { required, name, errors } = context;

  if (!required) {
    return null;
  }

  const error =
    errors && fromFormHelpers.resolveObjectValueByPath(errors, name)?.message;

  return (
    <FormErrorLable
      py="2px"
      px={1}
      fontSize="14px"
      message={error}
      {...props}
    />
  );
};
