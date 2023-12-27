/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, IconButton, Input, InputGroup, InputRightElement, forwardRef } from "@chakra-ui/react";
import React from "react";

import { useStore } from "../store/context";

interface DateInputProps {
    styles: any;
    disabled?: boolean;
    onOpen: () => void;

}
export const DateInput = forwardRef<DateInputProps, 'div'>(({ onOpen, disabled }, ref) => {

    // HOOKS
    const { date, onDateChange, toggleContext, isNepali } = useStore((state:any) => ({
        date: state.date,
        onDateChange: state.onDateChange,
        toggleContext: state.toggleContext,
        isNepali: state.isNepali,
    }))

    // LOCAL STATE
    const [value, setValue] = React.useState("")

    React.useEffect(bindStateDateToLocalValue, [date])

    // FUNCTIONS
    function bindStateDateToLocalValue() {
        if (date) {
            setValue(date)
        }
    }

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value
        if (inputValue?.length > 10) {
            return
        }
        setValue(inputValue)
        onDateChange(inputValue)
        // if (inputValue?.length >= 10) {
        //     onDateChange(inputValue)
        // }
    }

    return <Box >
        <InputGroup>
            <Input
                autoComplete="off"
                value={value}
                onChange={handleInputChange}
                onClick={onOpen}
                ref={ref}
                placeholder='yyyy-mm-dd'
                bg='white'
                borderColor="#cccccc"
                rounded="sm"
                height={"38PX"}
                disabled={disabled}
                _placeholder={{
                    color: '#878787',
                    fontWeight: '300',
                    fontSize: '14px',
                    textTransform: 'lowercase',
                }}
            />

            <InputRightElement >
                <IconButton
                    bg="transparent"
                    _hover={{
                        bg: "transparent"
                    }}
                    icon={isNepali ?
                        <Box w={5} h={5}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="#bd3d44" d="M0 0h512v512H0"></path>
                                <path
                                    stroke="#fff"
                                    strokeWidth="40"
                                    d="M0 58h512M0 137h512M0 216h512M0 295h512M0 374h512M0 453h512"
                                ></path>
                                <path fill="#192f5d" d="M0 0h390v275H0z"></path>
                                <marker id="us-a" markerHeight="30" markerWidth="30">
                                    <path fill="#fff" d="M15 0l9.3 28.6L0 11h30L5.7 28.6"></path>
                                </marker>
                                <path
                                    fill="none"
                                    markerMid="url(#us-a)"
                                    d="M0 0l18 11h65 65 65 65 66L51 39h65 65 65 65L18 66h65 65 65 65 66L51 94h65 65 65 65L18 121h65 65 65 65 66L51 149h65 65 65 65L18 177h65 65 65 65 66L51 205h65 65 65 65L18 232h65 65 65 65 66L0 0"
                                ></path>
                            </svg>
                        </Box>
                        :
                        <Box w={5} h={5}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <defs>
                                    <clipPath id="np-b">
                                        <path fillOpacity="0.7" d="M0-16h512v512H0z"></path>
                                    </clipPath>
                                    <clipPath id="np-a">
                                        <path fillOpacity="0.7" d="M0 0h512v512H0z"></path>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#np-a)">
                                    <g clipPath="url(#np-b)" transform="translate(0 16)">
                                        <g fillRule="evenodd">
                                            <path
                                                fill="#ce0000"
                                                stroke="#000063"
                                                strokeWidth="13"
                                                d="M6.5 489.5h378.8L137.4 238.1l257.3.3L6.6-9.5v499z"
                                            ></path>
                                            <path
                                                fill="#fff"
                                                d="M180.7 355.8l-27 9 21.2 19.8-28.5-1.8 11.7 26.2-25.5-12.3.5 28.6-18.8-20.9-10.7 26.6-9.2-26.3-20.3 20.6 1.8-27.7L49 409l12.6-25-29.3.6 21.5-18.3-27.3-10.5 27-9L32.2 327l28.4 1.8L49 302.6l25.6 12.3-.5-28.6 18.8 20.9 10.7-26.6 9.1 26.3 20.4-20.6-1.9 27.7 27-11.4-12.7 25 29.4-.6-21.5 18.3zm-32.4-184.7l-11.3 8.4 5.6 4.6a93.8 93.8 0 0030.7-36c1.8 21.3-17.7 69-68.7 69.5a70.6 70.6 0 01-71.5-70.3c10 18.2 16.2 27 32 36.5l4.7-4.4-10.6-8.9 13.7-3.6-7.4-12.4 14.4 1-1.8-14.4 12.6 7.4 4-13.5 9 10.8 8.5-10.3 4.6 14 11.8-8.2-1.5 14.3 14.2-1.7-6.7 13.2 13.7 4z"
                                            ></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>

                        </Box>
                    }
                    size="xs"
                    onClick={() => {
                        toggleContext()
                    }}
                    aria-label='Toggle Calendar'
                />
            </InputRightElement>

        </InputGroup>
    </Box>
})