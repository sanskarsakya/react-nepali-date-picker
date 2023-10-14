import { Box, Container } from "@chakra-ui/react"
import { RigoNepaliDatePicker } from "../../components/nepali-date-picker/components/nepali-date-picker copy"
import { CALENDAR_MODE } from "../../components/nepali-date-picker/components/nepali-date-picker copy/calendar-engine"
import React from "react"

const DatePickerContainer = () => {
  const [state, setState] = React.useState({
    date: '2023-09-15',
    dateType: CALENDAR_MODE.ENGLISH,
    calendarDate: '2023-09-15',
    is_dark: false,
    disableDateBefore: '2023-9-02',
    disableDateAfter: '2023-09-29',
  })
  return (
    <Container py={10}>
      {/* props control */}

      {/* input */}

      {/* date picker body */}
      <Box
        id={'input-wrapper-1'}
        // border='1px solid #E1E7EF'
        // borderRadius='5px'
        maxW='175px'
      >
        <RigoNepaliDatePicker {...state} onChange={() => {}} />
      </Box>

      {/* error message */}
    </Container>
  )
}

export default DatePickerContainer