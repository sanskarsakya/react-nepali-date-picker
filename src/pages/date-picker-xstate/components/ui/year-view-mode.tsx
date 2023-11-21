import { Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

interface YearViewModeProp {
    state: any;
    send: any
    styles?: any
}
export const YearViewMode = ({ state, send, styles }: YearViewModeProp) => {
    return <>
        <Flex sx={styles.year_view_mode.panel}>
            <Button
                // sx={styles.year_view_mode.decade_button}
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    send("on_previous_decade_click")
                }}
            // isDisabled={_selected - 10 <= fromCalendarEngine.minADYear}
            >
                <AiOutlineDoubleLeft  />
            </Button>
            <Text
                p={2} fontSize='16px' fontWeight='600'>
                {state.context.grid_years[0]} - {state.context.grid_years[0] + 10}
            </Text>
            <Button
                // sx={styles.year_view_mode.decade_button}
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    send("on_next_decade_click")
                }}
            // isDisabled={_selected + 10 > fromCalendarEngine.maxADYear}
            >
                <AiOutlineDoubleRight  />
            </Button>
        </Flex>
        <Flex
            flexWrap={'wrap'}
            columnGap={'8px'}
            rowGap={'8px'}
            p={2}
        >
            {state.context.grid_years.map((year: number, index: number) => {
                return <Button
                    key={index}
                    size={'sm'}
                    variant='unstyled'
                    // isDisabled={isDisabled}
                    onClick={() => {
                        send("on_year_selection", {
                            data: {
                                year
                            }
                        })

                    }}
                    style={{
                        flex: '0 0 calc(33.33% - 8px)',
                        boxSizing: 'border-box',
                        padding: '4px',
                        cursor: 'pointer',
                        // opacity: isnotFocus || isDisabled ? 0.6 : 1,
                    }}
                >
                    <Text
                        fontWeight='400'>{year}</Text>
                </Button>
            })}


        </Flex>
    </>

}