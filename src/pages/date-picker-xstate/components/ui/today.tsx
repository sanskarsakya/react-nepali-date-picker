import { Box, Button } from '@chakra-ui/react'

interface TodayProps {
    state: any
    send: any
    styles: any
    onChange?: any
}
const Today = ({ send, state, onChange, styles }: TodayProps) => {
    return <Box
        as={Button}
        sx={styles.today}
        isDisabled={!state.context.is_today_valid}
        w="full"
        p={3}
        mt={1}
        bg="white"
        fontSize={"14px"}
        borderRadius={"none"}
        fontWeight="400"
        textAlign='center'
        cursor='pointer'
        color='#0875e1'
        borderTop='1px solid #E5E6EB'
        onClick={() => {
            send("on_today_click", {
                data: {
                    onChange
                }
            })
        }}
        _hover={{
            bg: "white"
        }}
    >
        Today
    </Box>
}

export default Today