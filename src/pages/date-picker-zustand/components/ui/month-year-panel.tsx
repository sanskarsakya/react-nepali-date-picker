import { Box } from "@chakra-ui/react";
import { useCalendarStore } from "../store";

interface MonthYearPanelProps {
  styles: any
}
export const MonthYearPanel = ({ styles }: MonthYearPanelProps) => {

  const { monthYearPanelData } = useCalendarStore(state => ({
    monthYearPanelData: state.monthYearPanelData
  }))

  return <Box sx={styles.month_year_panel}>
    {monthYearPanelData}
  </Box>
}