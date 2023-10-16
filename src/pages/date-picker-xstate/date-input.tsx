import React from "react"
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface DateInputProps {
    state: any;
    send: any;

}
export const DateInput = ({ state, send }: DateInputProps) => {

    const [value, setValue] = React.useState("")

    React.useEffect(() => {

        if(state.context.date) {
            setValue(state.context.date)
        }
    }, [state.context.date])

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value
        if (inputValue?.length > 10) {
            return
        }
        setValue(inputValue)
        console.log(inputValue)
        if (inputValue?.length >= 10) {
            send("on_date_input", {
                data: {
                    date: inputValue
                }
            })
        }
    }
    return <Box maxW={175}>
        <InputGroup>
            <Input
                value={value}
                onChange={handleInputChange}
                onClick={() => {
                    send("open_calendar")
                }}
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
            // {...rest}
            />
            <InputRightElement width='25px'>
                <Box
                    cursor='pointer'
                    width='full'
                    height='full'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    onClick={() => {
                        // if (inputDate.length === 0) {
                        //     onClick();
                        // } else {
                        //     handleClearInput();
                        // }
                    }}
                >
                    {/* <If condition={inputDate.length === 0}>
                        <Then>
                            <BiCalendar size='16px' color='gray' />
                        </Then>
                        <Else>
                            <RxCross2 size='16px' color='gray' />
                        </Else>
                    </If> */}
                </Box>
            </InputRightElement>
        </InputGroup>
    </Box>
}