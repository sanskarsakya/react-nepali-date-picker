import { Flex } from '@chakra-ui/react';
import { RigoComponent } from './rigo-component';
import { RigoFormControl } from './rigo-form-control';
import { RigoFormErrorLabel } from './rigo-form-error-label';
import { RigoFormHelperText } from './rigo-form-helper-text';
import { RigoFormLabel } from './rigo-form-label';
import { RigoNepaliDatePicker } from './rigo-nepali-date-picker';

export const RigoDefault = (props: any) => {
  return (
    <RigoNepaliDatePicker {...props}>
      <RigoFormControl>
        <Flex gap={2}>
          <RigoFormLabel />
          <RigoFormHelperText />
        </Flex>
        <RigoComponent />
        <RigoFormErrorLabel />
      </RigoFormControl>
    </RigoNepaliDatePicker>
  );
};
