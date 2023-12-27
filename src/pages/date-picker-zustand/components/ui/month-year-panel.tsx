import { Box } from "@chakra-ui/react";
import { useStore } from "../store/context";

interface MonthYearPanelProps {
  styles: any
}
export const MonthYearPanel = ({ styles }: MonthYearPanelProps) => {

  const { monthYearPanelData } = useStore((state:any) => ({
    monthYearPanelData: state.monthYearPanelData
  }))

  return <Box sx={styles.month_year_panel}>
    {monthYearPanelData}
  </Box>
}