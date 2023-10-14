import { Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

interface YearViewModeProp {
    state: any;
    send: any
}
export const MonthViewMode = ({ state, send }: YearViewModeProp) => {
    return <>
        <Flex justifyContent='space-between' p={1} pt={3}>
            <Button
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    send("")
                }}
            // isDisabled={_selected - 10 <= fromCalendarEngine.minADYear}
            >
                <AiOutlineDoubleLeft color='black' />
            </Button>
            <Text p={2} fontSize='16px' fontWeight='600'>
                {/* {state.context.grid_years[0]}  */}
            </Text>
            <Button
                size='xs'
                px={7}
                _hover={{ bg: 'gray.100' }}
                variant='link'
                onClick={() => {
                    send("")
                }}
            // isDisabled={_selected + 10 > fromCalendarEngine.maxADYear}
            >
                <AiOutlineDoubleRight color='black' />
            </Button>
        </Flex>
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
                                month:index + 1
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