import { Box } from "@chakra-ui/react"
import { nepaliMonthMap } from "../../components/nepali-date-picker/components/nepali-date-picker copy/calendar-engine"

interface MonthYearPanelProps {
    state:any
}
export const MonthYearPanel = ({state}: MonthYearPanelProps) => {
    return <Box w="full" sx={{
      p: '6px',
      bg: "#EEEFF1",
      color: "#2C2D2C",
      textAlign: 'center',
      my: '5px'
    }}>
      {`${nepaliMonthMap[state.context.panel_month]} ${state.context.panel_year}`}
    </Box>
}