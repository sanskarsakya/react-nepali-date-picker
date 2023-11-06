import { useFormContext } from 'react-hook-form';

/* eslint-disable-next-line */
export interface ConnectFormProps {
  children: any;
}

export const ConnectForm = (props: ConnectFormProps) => {
  const { children } = props;
  const methods = useFormContext();

  return children({ ...methods });
};

export default ConnectForm;
