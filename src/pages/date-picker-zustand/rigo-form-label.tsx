import FormLabel from "../FormLabel";
import { FormLabelPropsType } from "./interface";
import { useDatePicker } from "./use-date-picker";

export const RigoFormLabel = (props: FormLabelPropsType) => {
  const { label } = useDatePicker();
  return <FormLabel label={`${label}`} {...props} />;
};
