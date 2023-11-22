import { Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

interface YearViewModeProp {
    state: any;
    send: any
    styles: any
}
export const MonthViewMode = ({ state, send, styles }: YearViewModeProp) => {
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
                    send("on_previous_year_click")
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
                    send("on_year_view_mode_click")
                }}
            >
                <Text p={2} fontSize='16px' fontWeight='600'>
                    {state.context.calendar_reference_date.split("-")[0]}
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
                    send("on_next_year_click")
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
            {state.context.grid_months.map((month: number, index: number) => {
                return <Button
                    key={index}
                    id="month_cell_button"
                    size={'sm'}
                    variant='unstyled'
                    onClick={() => {
                        send("on_month_selection", {
                            data: {
                                month: index + 1
                            }
                        })

                    }}
                    sx={styles.month_view_mode.body}
                >
                    <Text fontSize={'14px'} fontWeight='400'>{month}</Text>
                </Button>
            })}


        </Flex>
    </>

}