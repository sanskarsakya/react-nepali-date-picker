import { Box } from "@chakra-ui/react"

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
      {state.context.month_year_panel_data}
    </Box>
}