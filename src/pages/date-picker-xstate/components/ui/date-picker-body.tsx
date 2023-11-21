import { Flex, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import { IDayInfo, zero_pad } from "../calendar-engine";

interface DatepickerBodyProps {
    state: any;
    send: any
    onChange?: any
    styles: any
}
export const DatePickerBody = ({ state, send, onChange, styles }: DatepickerBodyProps) => {

    return <Table id="table" sx={styles.date_picker_body.table}>
        <Thead id="header" sx={styles.date_picker_body.header}>
            <Tr
                p={0}
                id="weekday_panel"
                sx={styles.date_picker_body.weekday_panel}
            >
                {state.context.date_picker_body_data.weeks.map(
                    (weekDay: string, index: number) => (
                        <Td
                            id="weekday"
                            // border="1px solid red"
                            // sx={Styles.date_picker_body.weekday}
                            p={0}
                            key={index}
                        >
                            {weekDay}
                        </Td>
                    ),
                )}
            </Tr>
        </Thead>
        <Tbody
            id="body"
            p={0}
        // sx={Styles.date_picker_body.body}
        >
            {state.context.grid_dates.map(
                (calendarDate: IDayInfo[], weekRowIdx: number) => {
                    return (
                        <Tr
                            id="day_panel"
                            p={0}

                            key={`week-row-${weekRowIdx}`}
                        // sx={Styles.date_picker_body.day_panel}
                        >
                            {calendarDate.map(
                                (dayInfo: IDayInfo, weekDayIdx: number) => {

                                    const sx_base = {
                                        ...styles.date_picker_body.day_base,
                                        ...(dayInfo.isSelected && { ...styles.date_picker_body.day_selected }),
                                        ...(dayInfo.isToday && { ...styles.date_picker_body.day_today_indicator }),
                                        ...(dayInfo.isDisabled && { ...styles.date_picker_body.day_disabled }),
                                    };

                                    return (
                                        <Td
                                            p={0}
                                            id="day_base"
                                            key={`week-day-${weekDayIdx}`}
                                            sx={sx_base}
                                            // border="1px solid red"
                                            onClick={() => {
                                                if (dayInfo.isDisabled) {
                                                    return
                                                }
                                                const working_date = `${dayInfo?.workingYear}-${zero_pad(dayInfo?.workingMonth as number)}-${zero_pad(dayInfo?.workingDay as number)}`;
                                                send("on_day_selection", {
                                                    data: {
                                                        date: working_date,
                                                        onChange
                                                    }
                                                })
                                            }}
                                        >
                                            <Flex
                                                id="cell"
                                                sx={styles.date_picker_body.cell}
                                            >
                                                <Text
                                                    id="primary_label"
                                                    sx={styles.date_picker_body.primary_label}
                                                >
                                                    {dayInfo.primaryDay}
                                                </Text>
                                                <Text
                                                    id="seconadry_label"
                                                    sx={styles.date_picker_body.secondary_label}
                                                >
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