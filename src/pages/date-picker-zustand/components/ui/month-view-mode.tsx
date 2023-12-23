import { Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useCalendarStore } from "../store";

interface YearViewModeProp {
    styles: any
}
export const MonthViewMode = ({ styles }: YearViewModeProp) => {

    const { calendarReferenceDate, gridMonths, goToYearView, getNextYear, getPreviousYear, selectMonth } = useCalendarStore(state => ({
        calendarReferenceDate: state.calendarReferenceDate,
        gridMonths: state.gridMonths,
        getNextYear: state.getNextYear,
        getPreviousYear: state.getPreviousYear,
        selectMonth: state.selectMonth,
        goToYearView: state.goToYearView,
    }))

    return <>
        {/* START MONTH CONTROLLER */}
        <Flex
            sx={styles.month_view_mode.panel} justifyContent='space-between' p={1} pt={3}>
            <Button
                id="previous_year_button"
                sx={styles.month_view_mode.year_button}
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    getPreviousYear()
                }}
            // isDisabled={_selected - 1 < fromCalendarEngine.minADYear}
            >
                <AiOutlineDoubleLeft />
            </Button>

            <Button
                variant='unstyled'
                id="year_view_mode_button"
                sx={styles.month_view_mode.year_button}
                _hover={{ color: '#0875e1', bg: 'gray.100' }}
                onClick={() => {
                    goToYearView()
                }}
            >
                <Text p={2} fontSize='16px' fontWeight='600'>
                    {calendarReferenceDate.split("-")[0]}
                </Text>
            </Button>

            <Button
                id="next_year_button"
                sx={styles.month_view_mode.year_button}
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    getNextYear()
                }}
            // isDisabled={_selected + 1 > fromCalendarEngine.maxADYear}
            >
                <AiOutlineDoubleRight />
            </Button>
        </Flex>
        {/* END MONTH CONTROLLER */}
        <Flex
            style={{
                flexWrap: 'wrap',
                columnGap: '8px',
                rowGap: '8px',
            }}
            p={2}
        >
            {gridMonths.map((month: string, index: number) => {
                return <Button
                    key={index}
                    id="month_cell_button"
                    size={'sm'}
                    variant='unstyled'
                    onClick={() => {
                        selectMonth(index + 1)
                    }}
                    sx={styles.month_view_mode.body}
                >
                    <Text fontSize={'14px'} fontWeight='400'>{month}</Text>
                </Button>
            })}


        </Flex>
    </>

}