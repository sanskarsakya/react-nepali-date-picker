import { Text, TextProps } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';

interface FormErrorLabelProps extends TextProps {
  message?: string;
}

export const FormErrorLable = ({ message, ...rest }: FormErrorLabelProps) => {
  if (isEmpty(message)) {
    return null;
  }
  return (
    <Text color="red.500" {...rest}>
      {message}
    </Text>
  );
};

export default FormErrorLable;
