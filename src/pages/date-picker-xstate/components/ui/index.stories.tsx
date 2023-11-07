import type { Meta, StoryObj } from '@storybook/react';

import { DatePickerXState } from '.';
import { ChakraProvider } from '@chakra-ui/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Datepicker/ Datepicker',
    component: DatePickerXState,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
    },
} satisfies Meta<typeof DatePickerXState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
    args: {
        isNepali: false,
        onChange: (date: string) => {
            console.log(date)
        }
    },
    render: (args) => {
        return <ChakraProvider><DatePickerXState {...args} /></ChakraProvider>
    }
}