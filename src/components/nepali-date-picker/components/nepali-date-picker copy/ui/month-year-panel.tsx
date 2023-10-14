import { ADToBS } from "bikram-sambat-js";
import { useDatePicker } from '../date-picker/useDatePicker';
import { englishToNepaliNumber } from "nepali-number";
import * as fromCalendarEngine from '../calendar-engine';
import { Box } from "@chakra-ui/react";
import { get_styles } from "../style";

export const MonthYearPanel = () => {
    const { _calendarDate, is_dark } = useDatePicker();
    const now = new Date(_calendarDate);
    const panelMonth = now.getMonth();
    const panel_converted_nepali_date = ADToBS(now);
    const panel_splited_nepali_date = panel_converted_nepali_date.split('-');
    const panelYear = englishToNepaliNumber(panel_splited_nepali_date[0]);
  
    const Styles = get_styles(is_dark);
  
    return (
      <Box sx={Styles.month_year_panel}>
        {`${fromCalendarEngine.nepaliMonthMap[panelMonth]} ${panelYear}`}
      </Box>
    );
  };
  