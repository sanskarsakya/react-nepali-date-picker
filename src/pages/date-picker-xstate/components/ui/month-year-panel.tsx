import { Box } from "@chakra-ui/react";

interface MonthYearPanelProps {
    state:any
    styles: any
}
export const MonthYearPanel = ({state, styles}: MonthYearPanelProps) => {

  return <Box sx={styles.month_year_panel}>
      {state.context.month_year_panel_data} 
    </Box>
}