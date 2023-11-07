import { Flex, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import { IDayInfo, weeks, zero_pad } from "../../../../components/nepali-date-picker/components/nepali-date-picker copy/calendar-engine";
import { get_styles } from "./style";

interface DatepickerBodyProps {
    state: any;
    send: any
    onChange?: any
}
export const DatePickerBody = ({ state, send, onChange }: DatepickerBodyProps) => {
    const Styles = get_styles(false);

    return <Table>
        <Thead>
            <Tr sx={{
                bg: "#fff",
                color: '#535562',
            }}>
                {weeks['en'].map(
                    (weekDay: string, index: number) => (
                        <Td p={2} key={index}>
                            {weekDay}
                        </Td>
                    ),
                )}
            </Tr>
        </Thead>
        <Tbody>
            {state.context.grid_dates.map(
                (calendarDate: IDayInfo[], weekRowIdx: number) => {
                    return (
                        <Tr key={`week-row-${weekRowIdx}`}>
                            {calendarDate.map(
                                (dayInfo: IDayInfo, weekDayIdx: number) => {

                                    const sx = {
                                        p: 2,
                                        ...(dayInfo.isSelected &&
                                            dayInfo.isCurrentMonth && { ...Styles.selected }),
                                        ...(dayInfo.isToday && { ...Styles.today }),
                                        ...(dayInfo.isToday && dayInfo.isSelected && { ...Styles.todayselected }),
                                        ...(!dayInfo.isDisabled
                                            ? { ...Styles.current }
                                            : { ...Styles.disabled }),
                                    };
                                    return (
                                        <Td
                                            key={`week-day-${weekDayIdx}`}
                                            sx={sx}
                                            onClick={() => {
                                                const working_date = `${dayInfo?.workingYear}-${zero_pad(dayInfo?.workingMonth as number)}-${zero_pad(dayInfo?.workingDay as number)}`;
                                                send("on_day_selection", {
                                                    data: {
                                                        date:working_date,
                                                        onChange
                                                    }
                                                })
                                            }}
                                        >
                                            <Flex gap={'3px'}>
                                                <Text fontSize={'14px'}>
                                                    {dayInfo.primaryDay}
                                                </Text>
                                                <Text pt='1px' fontSize={'11px'}>
                                                    {dayInfo.secondaryDay}
                                                </Text>
                                            </Flex>
                                        </Td>
                                    );
                                },
                            )}
                        </Tr>
                    );
                },
            )}
        </Tbody>
    </Table>
}