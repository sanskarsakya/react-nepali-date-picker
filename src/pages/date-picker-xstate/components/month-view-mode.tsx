import { Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

interface YearViewModeProp {
    state: any;
    send: any
}
export const MonthViewMode = ({ state, send }: YearViewModeProp) => {
    return <>
        {/* START MONTH CONTROLLER */}
        <Flex justifyContent='space-between' p={1} pt={3}>
            <Button
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    send("on_previous_year_click")
                }}
            // onClick={onPreviousYearClickHandler}
            // isDisabled={_selected - 1 < fromCalendarEngine.minADYear}
            >
                <AiOutlineDoubleLeft color='black' />
            </Button>

            <Button
                variant='unstyled'
                onClick={() => {
                    send("on_year_view_mode_click")
                }}
                _hover={{ color: '#0875e1', bg: 'gray.100' }}
            >
                <Text p={2} fontSize='16px' fontWeight='600'>
                    {state.context.calendar_reference_date.split("-")[0]}
                </Text>
            </Button>

            <Button
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    send("on_next_year_click")
                }}
            // isDisabled={_selected + 1 > fromCalendarEngine.maxADYear}
            >
                <AiOutlineDoubleRight color='black' />
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
                    size={'sm'}
                    variant='unstyled'
                    color='black'
                    // isDisabled={isDisabled}
                    // _hover={
                    //     !isnotFocus && !isDisabled
                    //         ? { color: '#0875e1', bg: 'gray.100' }
                    //         : { bg: 'gray.100' }
                    // }
                    onClick={() => {
                        send("on_month_selection", {
                            data: {
                                month: index + 1
                            }
                        })
                        // if (isFirstButton) {
                        //     onPreviousDecadeClickHandler();
                        // } else if (isLastButton) {
                        //     onNextDecadeClickHandler();
                        // } else {
                        //     onYearSelectHandler(new_date);
                        //     _setViewMode(fromCalendarEngine.VIEW_MODE.MONTH);
                        // }
                    }}
                    style={{
                        flex: '0 0 calc(33.33% - 8px)',
                        boxSizing: 'border-box',
                        padding: '4px',
                        cursor: 'pointer',
                        // opacity: isnotFocus || isDisabled ? 0.6 : 1,
                    }}
                >
                    <Text fontWeight='400'>{month}</Text>
                </Button>
            })}


        </Flex>
    </>

}