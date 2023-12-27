import { Box, Button } from '@chakra-ui/react'
import { useStore } from '../store/context'

interface TodayProps {
    styles: any
}
const Today = ({  styles }: TodayProps) => {

    const { selectToday, isTodayValid } = useStore((state:any) => ({
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