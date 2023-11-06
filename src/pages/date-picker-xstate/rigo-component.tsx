import { ComponentProps } from "./interface";
import { useDatePicker } from "./use-date-picker";
import { RigoRhfComponent } from "./rigo-rhf-component";
import { RigoUncontrolledComponent } from "./rigo-uncontrolled-component";

export const RigoComponent = (props: ComponentProps) => {
  const { control } = useDatePicker();

  if (control) {
    return <RigoRhfComponent {...props} />;
  }
  return <RigoUncontrolledComponent {...props} />;
};
