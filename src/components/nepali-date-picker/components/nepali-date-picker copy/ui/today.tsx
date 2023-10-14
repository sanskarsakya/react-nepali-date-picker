import { Box, Button } from '@chakra-ui/react';
import { ADToBS } from 'bikram-sambat-js';
import dayjs from 'dayjs';
import * as fromUserCases from '../calendar-engine/use-cases';
import { useDatePicker } from '../date-picker/useDatePicker';

export const Today = () => {

  const {
    disableDateBefore,
    disableDateAfter,
    onTodayClickHandlerEnglish
  } = useDatePicker();

  const is_nepali = false;

  const today_date = is_nepali ? ADToBS(dayjs().format("YYYY-MM-DD")) : dayjs().format("YYYY-MM-DD");
  const isValid = fromUserCases.ENGLISH_DATE.validate_date_in_range(today_date, disableDateBefore, disableDateAfter)
  return (
    <Box
      as={Button}
      isDisabled={!isValid}
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
      onClick={onTodayClickHandlerEnglish}
      _hover={{
        bg: "white"
      }}
    >
      Today
    </Box>
  );
};
