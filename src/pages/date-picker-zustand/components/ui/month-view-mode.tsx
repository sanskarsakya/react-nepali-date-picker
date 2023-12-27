import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useStore } from "../store/context";

interface YearViewModeProp {
    styles: any
}
export const MonthViewMode = ({ styles }: YearViewModeProp) => {

    const { calendarReferenceDate, gridMonths, goToYearView, getNextYear, getPreviousYear, selectMonth } = useStore((state:any) => ({
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
            w="full"
            justifyContent="space-between"
            sx={styles.month_view_mode.panel}

        >
            <IconButton
                aria-label='previous_year_button'
                id='previous_year_button'
                bg="transparent"
                _hover={{
                    bg: "transparent"
                }}
                icon={<AiOutlineDoubleLeft />}
                // sx={styles.month_view_mode.year_button}
                onClick={getPreviousYear}
            />

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

            <IconButton
                aria-label='next-year-button'
                id='next-year-button'
                bg="transparent"
                _hover={{
                    bg: "transparent"
                }}
                icon={<AiOutlineDoubleRight />}
                // sx={styles.month_view_mode.year_button}
                onClick={getNextYear}
            />

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