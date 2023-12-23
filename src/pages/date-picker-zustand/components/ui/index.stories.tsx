import type { Meta, StoryObj } from '@storybook/react';

import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { DatePicker } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Datepicker/ Datepicker zustand',
    component: DatePicker,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
    },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const today = dayjs().format("YYYY-MM-DD");

export const Sample: Story = {
    args: {
        date: dayjs(today).add(10, "day").format("YYYY-MM-DD"),
        disableDateBefore: dayjs(today).subtract(1, "month").format("YYYY-MM-DD"),
        disableDateAfter: dayjs(today).add(1, "month").format("YYYY-MM-DD"),
        onChange: (date: string) => {
            console.log("date", date)
        },
        isNepali: false,
        disabled: true,
    },
    argTypes: {
        date: {
            control: {
                type: "text"
            }
        }
    },
    render: (args) => {
        return <DatePicker {...args} />
    }
}

export const Controlled: Story = {
    args: {
        date: dayjs(today).add(10, "day").format("YYYY-MM-DD"),
        disableDateBefore: dayjs(today).subtract(1, "month").format("YYYY-MM-DD"),
        disableDateAfter: dayjs(today).add(1, "month").format("YYYY-MM-DD"),
        onChange: (date: string) => {
            console.log("date", date)
        },
        /**
         * if isNepali is true then date should also be in nepali format
         * and vice versa
         */
        isNepali: false, 
        disabled: false,
    },
    argTypes: {
        date: {
            control: {
                type: "text"
            }
        }
    },
    render: (args) => {
        return <ComponentRender {...args} />
    }
}

const ComponentRender = (args: any) => {
    const [isNepali, setIsNepali] = React.useState<boolean>(args.isNepali);
    return <>

        <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
                Is In Nepali Mode?
            </FormLabel>
            <Switch isChecked={isNepali} onChange={(e: any) => {
                setIsNepali(e.target.checked)
            }} />

        </FormControl>

        <DatePicker {...{ ...args, isNepali }} onChange={(data:any) => {
            console.log(data)
            setIsNepali(data.isNepali)
        }} />
    </>
}