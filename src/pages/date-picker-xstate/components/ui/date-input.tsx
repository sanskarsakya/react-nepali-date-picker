import { Box, Input, InputGroup, forwardRef } from "@chakra-ui/react";
import React from "react";

interface DateInputProps {
    state: any;
    send: any;
    styles: any;
    onChange?: any;

}
export const DateInput = forwardRef<DateInputProps, 'div'>(({ state, send, onChange }, ref) => {

    const [value, setValue] = React.useState("")

    React.useEffect(() => {

        if (state.context.date) {
            setValue(state.context.date)
        }
    }, [state.context.date])

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value
        if (inputValue?.length > 10) {
            return
        }
        setValue(inputValue)
        if (inputValue?.length >= 10) {
            send("on_date_input", {
                data: {
                    date: inputValue,
                    onChange
                }
            })

            // onChange?.(inputValue)
        }
    }
    return <Box >
        <InputGroup>
            <Input
                autoComplete="off"
                value={value}
                onChange={handleInputChange}
                onClick={() => {
                    send("open_calendar")
                }}
                ref={ref}
                // onClick={onClick}
                placeholder='yyyy-mm-dd'
                bg='white'
                w='full'
                height='38px'
                size='md'
                border='1px solid'
                borderRadius='4px'
                // borderColor={_isValid?.length === 0 ? '#CDD5DF' : 'red'}
                _hover={{ borderColor: '#B6C3D3' }}
                _placeholder={{
                    color: '#878787',
                    fontWeight: '300',
                    fontSize: '14px',
                    textTransform: 'lowercase',
                }}
            />

        </InputGroup>
    </Box>
})