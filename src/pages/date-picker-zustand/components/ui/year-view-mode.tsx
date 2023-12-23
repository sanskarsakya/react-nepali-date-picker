import { Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useCalendarStore } from "../store";

interface YearViewModeProp {
    styles?: any
}
export const YearViewMode = ({ styles }: YearViewModeProp) => {
    const { selectYear, gridYears, getNextDecadeYearGrid, getPreviousDecadeYearGrid } = useCalendarStore(state => ({
        gridYears: state.gridYears,
        getNextDecadeYearGrid: state.getNextDecadeYearGrid,
        getPreviousDecadeYearGrid: state.getPreviousDecadeYearGrid,
        selectYear: state.selectYear,
    }))

    return <>
        <Flex sx={styles.year_view_mode.panel}>
            <Button
                // sx={styles.year_view_mode.decade_button}
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    getPreviousDecadeYearGrid()
                    // send("on_previous_decade_click")
                }}
            // isDisabled={_selected - 10 <= fromCalendarEngine.minADYear}
            >
                <AiOutlineDoubleLeft />
            </Button>
            <Text
                p={2} fontSize='16px' fontWeight='600'>
                {gridYears[0]} - {gridYears[0] + 11}
            </Text>
            <Button
                // sx={styles.year_view_mode.decade_button}
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    getNextDecadeYearGrid()
                    // send("on_next_decade_click")
                }}
            // isDisabled={_selected + 10 > fromCalendarEngine.maxADYear}
            >
                <AiOutlineDoubleRight />
            </Button>
        </Flex>
        <Flex
            flexWrap={'wrap'}
            columnGap={'8px'}
            rowGap={'8px'}
            p={2}
        >
            {gridYears.map((year: number, index: number) => {
                return <Button
                    key={index}
                    size={'sm'}
                    variant='unstyled'
                    // isDisabled={isDisabled}
                    onClick={() => {
                        selectYear(year)
                    }}
                    sx={styles.year_view_mode.body}
                >
                    <Text
                        fontWeight='400'>{year}</Text>
                </Button>
            })}


        </Flex>
    </>

}