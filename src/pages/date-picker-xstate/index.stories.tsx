import { Button, Flex } from '@chakra-ui/react';
import type { Meta } from '@storybook/react';
import NepaliDatepickerV2 from '.';
import FormProvider from '../FormProvider';
import ConnectForm from '../connect-form';

const meta: Meta<typeof NepaliDatepickerV2> = {
  component: NepaliDatepickerV2,
  title: 'V2/Forms/Nepali Date Picker V2',
};

export default meta;

const argsBase = {
  value: '2023-10-29',
  disableDateBefore: '2023-08-29',
  disableDateAfter: '2023-12-29',
  is_dark: false,
  is_nepali: false,
}

export const EngDefault = {
  args: argsBase,

  render: (args: any) => {
    return (
      <FormProvider
        onSubmit={(data: any) => {
          console.log(JSON.stringify(data, null, 2));
        }}
        defaultValues={{
          composed: args.value,
        }}
      >
        <ConnectForm>
          {(formProps: any) => {
            const {
              setError,
              trigger,
              control,
              formState: { errors },
            } = formProps;

            const inputProps = {
              control,
              errors,
              setError,
              trigger,
              dateType: args.dateType,
              disableDateBefore: args.disableDateBefore,
              disableDateAfter: args.disableDateAfter,
            };

            return (
              <Flex gap={2} direction="column">

                <NepaliDatepickerV2.Default
                  name='composed'
                  label='Composed And RHF Controlled'
                  disable_date_before={args.disableDateBefore}
                  disable_date_after={args.disableDateAfter}
                  is_dark={args.is_dark}
                  is_nepali={args.is_nepali}
                  required
                  {...inputProps}
                />

                <Flex>
                  <Button type='submit'>Submit</Button>
                </Flex>
              </Flex>
            );
          }}
        </ConnectForm>
      </FormProvider>
    );
  },
};

export const EnglishComposed = {
  args: argsBase,

  render: (args: any) => {
    return (
      <FormProvider
        onSubmit={(data: any) => {
          console.log(JSON.stringify(data, null, 2));
        }}
        defaultValues={{
          composed: args.value,
        }}
      >
        <ConnectForm>
          {(formProps: any) => {
            const {
              setError,
              trigger,
              control,
              formState: { errors },
            } = formProps;

            const inputProps = {
              control,
              errors,
              setError,
              trigger,
              dateType: args.dateType,
              disableDateBefore: args.disableDateBefore,
              disableDateAfter: args.disableDateAfter,
            };

            return (
              <Flex gap={2} direction="column">

                <NepaliDatepickerV2
                  name='composed'
                  label='Composed And RHF Controlled'
                  disable_date_before={args.disableDateBefore}
                  disable_date_after={args.disableDateAfter}
                  is_dark={args.is_dark}
                  is_nepali={args.is_nepali}
                  required
                  {...inputProps}
                >
                  <NepaliDatepickerV2.FormControl>
                    <Flex gap={2}>
                      <NepaliDatepickerV2.FormLabel />
                    </Flex>
                    <NepaliDatepickerV2.Component />
                    <NepaliDatepickerV2.HelperText />
                    <NepaliDatepickerV2.ErrorLabel />
                  </NepaliDatepickerV2.FormControl>
                </NepaliDatepickerV2>

                <Flex>
                  <Button type='submit'>Submit</Button>
                </Flex>
              </Flex>
            );
          }}
        </ConnectForm>
      </FormProvider>
    );
  },
};

export const EnglishDefaultUncontrolled = {
  args: argsBase,

  render: (args: any) => {
    const inputProps = {
      dateType: args.dateType,
      disableDateBefore: args.disableDateBefore,
      disableDateAfter: args.disableDateAfter,
    };

    return (
      <NepaliDatepickerV2.Default
        name='composed'
        label='Default Uncotrolled'
        disable_date_before={args.disableDateBefore}
        disable_date_after={args.disableDateAfter}
        is_dark={args.is_dark}
        is_nepali={args.is_nepali}
        onChange={(data: string) => {
          console.log(data)
        }}
        {...inputProps}
      />
    );
  },
};

export const EnglishComposedUncontrolled = {
  args: argsBase,

  render: (args: any) => {
    const inputProps = {
      dateType: args.dateType,
      disableDateBefore: args.disableDateBefore,
      disableDateAfter: args.disableDateAfter,
    };

    return (
      <NepaliDatepickerV2
        name='composed'
        label='Composed And RHF Controlled'
        disable_date_before={args.disableDateBefore}
        disable_date_after={args.disableDateAfter}
        is_dark={args.is_dark}
        is_nepali={args.is_nepali}
        onChange={(data: string) => {
          console.log(data)
        }}
        {...inputProps}
      >
        <NepaliDatepickerV2.FormControl>
          <Flex gap={2}>
            <NepaliDatepickerV2.FormLabel />
          </Flex>
          <NepaliDatepickerV2.Component />
          <NepaliDatepickerV2.HelperText />
          <NepaliDatepickerV2.ErrorLabel />
        </NepaliDatepickerV2.FormControl>
      </NepaliDatepickerV2>
    );
  },
};
