import { Flex, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import { IDayInfo, zero_pad } from "../calendar-engine";
import { get_styles_base } from "./style";

interface DatepickerBodyProps {
    state: any;
    send: any
    onChange?: any
    styles: any
}
export const DatePickerBody = ({ state, send, onChange }: DatepickerBodyProps) => {
    const Styles = get_styles_base(false);

    return <Table id="table" sx={Styles.date_picker_body.table}>
        <Thead id="header" p={0} sx={Styles.date_picker_body.header}>
            <Tr
                p={0}
                id="weekday_panel"
                sx={Styles.date_picker_body.weekday_panel}
            >
                {state.context.date_picker_body_data.weeks.map(
                    (weekDay: string, index: number) => (
                        <Td
                            p={0}
                            border="1px solid red"
                            id="weekday"
                            // sx={Styles.date_picker_body.weekday}
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
                                        ...Styles.date_picker_body.day_base,
                                        ...(dayInfo.isSelected && { ...Styles.date_picker_body.day_selected }),
                                        ...(dayInfo.isToday && { ...Styles.date_picker_body.day_today_indicator }),
                                        ...(dayInfo.isDisabled && { ...Styles.date_picker_body.day_disabled }),
                                    };

                                    return (
                                        <Td
                                            p={0}
                                            id="day_base"
                                            key={`week-day-${weekDayIdx}`}
                                            sx={sx_base}
                                            border="1px solid red"
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
                                                sx={Styles.date_picker_body.cell}
                                            >
                                                <Text
                                                    id="primary_label"
                                                    sx={Styles.date_picker_body.primary_label}
                                                >
                                                    {dayInfo.primaryDay}
                                                </Text>
                                                <Text
                                                    id="seconadry_label"
                                                    sx={Styles.date_picker_body.secondary_label}
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