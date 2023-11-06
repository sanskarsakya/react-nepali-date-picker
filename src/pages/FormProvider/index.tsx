import React from 'react';
// import { DevTool } from '@hookform/devtools';
import { FormProvider as RHFFormProvider, useForm } from 'react-hook-form';

/* eslint-disable-next-line */
export interface PzFormProviderProps {
  defaultValues?: any;
  children?: any;
  onSubmit?: any;
  showDevTool?: boolean;
}

export function FormProvider(props: PzFormProviderProps) {
  const { defaultValues, children, onSubmit } = props;
  const methods = useForm({ mode: 'all', defaultValues: defaultValues });

  return (
    <RHFFormProvider {...methods}>
      {/* {showDevTool && <DevTool control={methods.control} />} */}

      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </RHFFormProvider>
  );
}

export default FormProvider;
