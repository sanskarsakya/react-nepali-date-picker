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
    const { date, onDateChange, toggleContext, isNepali } = useStore((state: any) => ({
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
                        // NEPALI FLAG
                        <Box w={5} h={5}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <circle cx="256" cy="256" r="256" fill="#f0f0f0"></circle>
                                <path
                                    fill="#0052b4"
                                    d="M510.497 283.826l-.006-.008-.001.008zm-.007 0l.001-.008L229.746 1.331a255.168 255.168 0 00-37.109 6.574C81.898 36.1 0 256 0 256s358.398 239.835 399.285 212.164a256.89 256.89 0 0023.493-17.953L256.395 283.826z"
                                ></path>
                                <path
                                    fill="#d80027"
                                    d="M445.217 256L196.245 7.029C83.688 33.946 0 135.192 0 256c0 141.384 114.616 256 256 256 53.629 0 103.397-16.502 144.529-44.689L189.217 256z"
                                ></path>
                                <g fill="#f0f0f0">
                                    <path d="M243.472 377.993l-31.265-14.706 16.649-30.279-33.95 6.495-4.302-34.298-23.647 25.225-23.647-25.225-4.303 34.298-33.949-6.496 16.649 30.28-31.266 14.706 31.266 14.705-16.649 30.28 33.951-6.494 4.3 34.296 23.648-25.225 23.647 25.225 4.302-34.296 33.949 6.495-16.649-30.279zm-20.863-236.01l-22.74-10.695 12.109-22.023-24.693 4.724-3.129-24.946-17.199 18.347-17.199-18.347-3.13 24.946-24.693-4.724 12.11 22.023-22.741 10.695 55.653 11.132z"></path>
                                    <path d="M233.739 141.983c0 36.883-29.9 66.783-66.783 66.783s-66.783-29.9-66.783-66.783"></path>
                                </g>
                            </svg>
                        </Box>
                        :
                        // ENGLISH FLAG
                        <Box w={5} h={5}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Слой 1"
                                viewBox="0 0 512 512.01"
                            >
                                <path
                                    fill="#f0f0f0"
                                    d="M256 512c141.38 0 256-114.63 256-256S397.39 0 256 0 0 114.64 0 256s114.62 256 256 256z"
                                ></path>
                                <g fillRule="evenodd">
                                    <path
                                        fill="#d80027"
                                        d="M474.17 122.33H244.49V55.48h170.66a255.89 255.89 0 0159.02 66.85zM512 256H244.63v-66.83h258.56A256.28 256.28 0 01512 256zM256 512a254.3 254.3 0 00159.29-55.6H96.72A254.19 254.19 0 00256 512zm218.45-122.3H37.55a253.31 253.31 0 01-28.73-66.84h494.36a253.17 253.17 0 01-28.73 66.84z"
                                    ></path>
                                    <path
                                        fill="#0052b4"
                                        d="M118.85 39.84h-.23V40zm0 0H142l-21.81 15.65 8.25 25.6-21.76-15.65-21.62 15.65L92.17 59a256.08 256.08 0 00-49.49 55.5h7.54l-13.8 10-6.26 11 6.54 20.34-12.37-9-8.53 19.86 7.11 22.3h27l-21.46 15.81 8.25 25.6-21.76-15.65-12.8 9.38A237.13 237.13 0 000 256h256V0a254.85 254.85 0 00-137.15 39.84zm9.54 190.44l.19.15h-.14zm-8.21-25.46l8.21 25.46-21.72-15.5-21.76 15.65 8.25-25.6-21.76-15.65h27l8.25-25.6 8.25 25.6h27zm.15-74.52l8.25 25.6-21.76-15.65-21.76 15.65 8.25-25.6-21.76-15.65h27l8.25-25.6 8.25 25.6h27zm78.36 84.48l21.76 15.65-8.25-25.6 21.8-15.65h-27l-8.25-25.6-8.25 25.6h-27l21.76 15.65-8.25 25.6zm13.51-84.48l8.25 25.6-21.76-15.65-21.76 15.65 8.25-25.6-21.76-15.65h27l8.25-25.6 8.25 25.6h27zm8.25-48.93l-8.25-25.6L234 40.12h-27l-8.25-25.6-8.25 25.6h-27l21.76 15.65-8.25 25.6 21.76-15.65z"
                                    ></path>
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