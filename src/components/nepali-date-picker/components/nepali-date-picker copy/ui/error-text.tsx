import React from 'react';
import { When } from 'react-if';
import isEmpty from 'lodash/isEmpty';
import { useDatePicker } from '../date-picker/useDatePicker';

export const ErrorText = () => {
  const {
    _isValid,
  } = useDatePicker();

  return (
    <When condition={false  /*!isEmpty(errorMessage)} */} >
      {/* <FormErrorLable
        py='2px'
        px={1}
        fontSize='14px'
        message={errorMessage}
      /> */}
    </When>
  );
};
