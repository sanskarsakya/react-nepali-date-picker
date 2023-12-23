import { RigoComponent } from "./rigo-component";
import { RigoDefault } from "./rigo-default";
import { RigoFormControl } from "./rigo-form-control";
import { RigoFormErrorLabel } from "./rigo-form-error-label";
import { RigoFormHelperText } from "./rigo-form-helper-text";
import { RigoFormLabel } from "./rigo-form-label";
import { RigoNepaliDatePicker } from "./rigo-nepali-date-picker";

export const NepaliDatepickerV2 = (props: any) => {
  return <RigoNepaliDatePicker {...props} />;
};

NepaliDatepickerV2.Default = RigoDefault;
NepaliDatepickerV2.FormLabel = RigoFormLabel;
NepaliDatepickerV2.HelperText = RigoFormHelperText;
NepaliDatepickerV2.ErrorLabel = RigoFormErrorLabel;
NepaliDatepickerV2.FormControl = RigoFormControl;
NepaliDatepickerV2.Component = RigoComponent;


export default NepaliDatepickerV2;
