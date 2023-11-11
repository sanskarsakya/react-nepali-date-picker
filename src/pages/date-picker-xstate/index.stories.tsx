import { Button, ChakraProvider, Container, Flex } from '@chakra-ui/react';
import type { Meta } from '@storybook/react';
import NepaliDatepickerV2 from '.';
// import ConnectForm from '../ConnectForm';
import FormProvider from '../FormProvider';
import ConnectForm from '../connect-form';
// import { CALENDAR_MODE } from './components/nepali-date-picker copy/calendar-engine';

const meta: Meta<typeof NepaliDatepickerV2> = {
  component: NepaliDatepickerV2,
  title: 'V2/Forms/Nepali Date Picker V2',
};

export default meta;

export const Default = {
  args: {
    value: '2023-10-29',
    disableDateBefore: '2023-08-29',
    disableDateAfter: '2023-12-29',
    is_dark: false,
  },

  render: (args: any) => {
    return (
      <ChakraProvider>
        <FormProvider
          onSubmit={(data: any) => {
            console.log(JSON.stringify(data, null, 2));
          }}
          defaultValues={{
            // default: args.date,
            // empty: '',
            // disabled: '',
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
                <Container
                  maxW='xl'
                  py={5}
                  display='flex'
                  flexDirection='column'
                  gap={3}
                >

                  {/* <NepaliDatepickerV2.Default
                    name='default'
                    label='Default And RHF Controlled'
                    required
                    {...inputProps}
                  /> */}

                  {/* <NepaliDatepickerV2.Default
                    name='disabled'
                    label='Disable and enable date with RHF Controlled'
                    disableDateBefore={args.disableDateBefore}
                    disableDateAfter={args.disableDateAfter}
                    required
                    {...inputProps}
                  /> */}

                  <NepaliDatepickerV2
                    name='composed'
                    label='Composed And RHF Controlled'
                    disable_date_before={args.disableDateBefore}
                    disable_date_after={args.disableDateAfter}
                    is_dark={args.is_dark}
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

                  {/* <NepaliDatepickerV2.Default
                    name='uncontrolled'
                    label='Uncontrolled'
                    value={'2020-10-29'}
                    onChange={(name: string, value: string) => {
                      console.log({ name, value });
                    }}
                  /> */}

                  <Flex>
                    <Button type='submit'>Submit</Button>
                  </Flex>
                </Container>
              );
            }}
          </ConnectForm>
        </FormProvider>
      </ChakraProvider>
    );
  },
};
