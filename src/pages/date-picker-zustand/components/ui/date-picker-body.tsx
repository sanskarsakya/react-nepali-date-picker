import { Flex, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import { IDayInfo, zero_pad } from "../calendar-engine";
import { useStore } from "../store/context";

interface DatepickerBodyProps {
    styles: any
}
export const DatePickerBody = ({ styles }: DatepickerBodyProps) => {

    const { gridDates, selectDay, weeks } = useStore((state:any) => ({
        gridDates: state.gridDates,
        selectDay: state.selectDay,
        weeks: state.weeks,
    }))

    return <Table id="table" sx={styles.date_picker_body.table}>
        <Thead id="header" sx={styles.date_picker_body.header}>
            <Tr
                p={0}
                id="weekday_panel"
                sx={styles.date_picker_body.weekday_panel}
            >
                {weeks.map(
                    (weekDay: string, index: number) => (
                        <Td
                            id="weekday"
                            // border="1px solid red"
                            sx={styles.date_picker_body.weekday}
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
            {gridDates.map(
                (calendarDate: IDayInfo[], weekRowIdx: number) => {
                    return (
                        <Tr
                            id="day_panel"
                            p={0}

                            key={`week-row-${weekRowIdx}`}
                            sx={styles.date_picker_body.day_panel}
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
                                                // todo: add onchange here
                                                selectDay(working_date)
                                                // send("on_day_selection", {
                                                //     data: {
                                                //         date: working_date,
                                                //         onChange
                                                //     }
                                                // })
                                            }}
                                        >
                                            <Flex
                                                aria-label="cell"
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