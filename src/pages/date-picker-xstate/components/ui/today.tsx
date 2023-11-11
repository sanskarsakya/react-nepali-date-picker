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
        onClick={() => {
            send("on_today_click", {
                data: {
                    onChange
                }
            })
        }}
        
    >
        Today
    </Box>
}

export default Today