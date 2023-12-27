import { Button, Flex } from '@chakra-ui/react';
import type { Meta } from '@storybook/react';
import NepaliDatepickerV2 from '.';
import FormProvider from '../FormProvider';
import ConnectForm from '../connect-form';
import { ADToBS } from 'bikram-sambat-js';
import dayjs from 'dayjs';

const meta: Meta<typeof NepaliDatepickerV2> = {
  component: NepaliDatepickerV2,
  title: 'V2/Forms/Nepali Date Picker V2 zustand',
};

export default meta;

const today = dayjs().format("YYYY-MM-DD");

const argsBase = {
  value: "",
  isNepali:false,
  disableDateBefore: dayjs(today).subtract(1, "month").format("YYYY-MM-DD"),
  disableDateAfter: dayjs(today).add(1, "month").format("YYYY-MM-DD"),
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
            };

            return (
              <Flex gap={2} direction="column">
                <pre>{JSON.stringify(errors, null, 2)}</pre>

                <NepaliDatepickerV2.Default
                  name='composed'
                  label='Composed And RHF Controlled'
                  required
                  {...args}
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
            };

            return (
              <Flex gap={2} direction="column">

                <NepaliDatepickerV2
                  name='composed'
                  label='Composed And RHF Controlled'
                  required
                  {...args}
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

    return (
      <NepaliDatepickerV2.Default
        name='composed'
        label='Default Uncotrolled'
        {...args}
        onChange={(_: string, value: string) => {
          console.log(value)
        }}
      />
    );
  },
};

export const EnglishComposedUncontrolled = {
  args: argsBase,

  render: (args: any) => {

    return (
      <NepaliDatepickerV2
        name='composed'
        label='Composed And Uncontrolled'
        {...args}
        onChange={(_: string, value: string) => {
          console.log(value)
        }}
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

const argsBaseNepali = {
  ...argsBase,
  value: ADToBS(today),
  disableDateBefore: ADToBS(dayjs(today).subtract(1, "month").format("YYYY-MM-DD")),
  disableDateAfter: ADToBS(dayjs(today).add(1, "month").format("YYYY-MM-DD")),
  isNepali: true,
}

export const NepaliDefault = {
  args: argsBaseNepali,

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

export const NepaliComposed = {
  args: argsBaseNepali,

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

export const NepaliDefaultUncontrolled = {
  args: argsBaseNepali,

  render: (args: any) => {
    const inputProps = {
      dateType: args.dateType,
      disableDateBefore: args.disableDateBefore,
      disableDateAfter: args.disableDateAfter,
    };

    return (
      <NepaliDatepickerV2.Default
        name='composed'
        label='Default Uncontrolled'
        disable_date_before={args.disableDateBefore}
        disable_date_after={args.disableDateAfter}
        is_dark={args.is_dark}
        is_nepali={args.is_nepali}
        onChange={(_: string, value: string) => {
          console.log(value)
        }}
        {...inputProps}
      />
    );
  },
};

export const NepaliComposedUncontrolled = {
  args: argsBaseNepali,

  render: (args: any) => {
    const inputProps = {
      dateType: args.dateType,
      disableDateBefore: args.disableDateBefore,
      disableDateAfter: args.disableDateAfter,
    };

    return (
      <NepaliDatepickerV2
        name='composed'
        label='Composed And Uncontrolled'
        disable_date_before={args.disableDateBefore}
        disable_date_after={args.disableDateAfter}
        is_dark={args.is_dark}
        is_nepali={args.is_nepali}
        onChange={(_: string, value: string) => {
          console.log(value)
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
