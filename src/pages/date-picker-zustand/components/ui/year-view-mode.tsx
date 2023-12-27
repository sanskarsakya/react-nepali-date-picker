import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useStore } from "../store/context";

interface YearViewModeProp {
    styles?: any
}
export const YearViewMode = ({ styles }: YearViewModeProp) => {

    const { selectYear, gridYears, getNextDecadeYearGrid, getPreviousDecadeYearGrid } = useStore((state:any) => ({
        gridYears: state.gridYears,
        getNextDecadeYearGrid: state.getNextDecadeYearGrid,
        getPreviousDecadeYearGrid: state.getPreviousDecadeYearGrid,
        selectYear: state.selectYear,
    }))

    return <>
        <Flex 
        w="full"
        justifyContent="space-between"
        sx={styles.year_view_mode.panel}
        >
            <IconButton
                aria-label='previous-decard-button'
                id='next-year-button'
                bg="transparent"
                _hover={{
                    bg: "transparent"
                }}
                icon={<AiOutlineDoubleLeft />}
                onClick={getPreviousDecadeYearGrid}
            />

            <Text
                p={2} fontSize='16px' fontWeight='600'>
                {gridYears[0]} - {gridYears[0] + 11}
            </Text>
            <IconButton
                aria-label='next-decard-button'
                id='next-year-button'
                bg="transparent"
                _hover={{
                    bg: "transparent"
                }}
                icon={<AiOutlineDoubleRight />}
                onClick={getNextDecadeYearGrid}
            />
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