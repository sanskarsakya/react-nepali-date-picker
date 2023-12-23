import { Box, Button } from '@chakra-ui/react'
import { useCalendarStore } from '../store'

interface TodayProps {
    styles: any
}
const Today = ({  styles }: TodayProps) => {

    const { selectToday, isTodayValid } = useCalendarStore(state => ({
        selectToday: state.selectToday,
        isTodayValid: state.isTodayValid,
    }))


    return <Box
        as={Button}
        sx={styles.today}
        isDisabled={!isTodayValid}
        onClick={() => {
            selectToday()
        }}

    >
        Today
    </Box>
}

export default Today