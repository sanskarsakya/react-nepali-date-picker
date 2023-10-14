import { Box, Button, Code, Container, Flex, Table, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import { englishToNepaliNumber } from 'nepali-number';
import { Else, If, Then, When } from 'react-if';
import { machine } from './date-picker-machine';
import { IDayInfo, nepaliMonthMap, weeks, zero_pad } from '../../components/nepali-date-picker/components/nepali-date-picker copy/calendar-engine';
import { CalendarController } from './calendar-controller';
import Today from './today';
import { get_styles } from '../../components/nepali-date-picker/components/nepali-date-picker copy/style';
import { DateInput } from './date-input';
import { YearViewMode } from './year-view-mode';
import { MonthViewMode } from './month-view-mode';


export const DatePickerXState = () => {
  const [
    state,
    send,
  ] = useMachine(machine);

  const Styles = get_styles(false);

  return (
    <Container as={Flex} direction="column" alignItems="start" minH="100vh" gap={2}>

      <Code>State: {JSON.stringify(state.value, null, 2)}</Code>
      <Code>Date: {JSON.stringify(state.context.date, null, 2)}</Code>
      <Code>Calendar Reference Date: {JSON.stringify(state.context.calendar_reference_date, null, 2)}</Code>

      <DateInput state={state} send={send} />
      <Flex alignItems="center" gap={2}>

        <Button size="sm"
          onClick={() => {
            send("open_calendar")
          }}
        >
          open calendar body
        </Button>
        <Button size="sm"
          onClick={() => {
            send("on_outside_click")
          }}
        >
          close calendar body
        </Button>
      </Flex>

      <When condition={state.matches({ "calendar_body_opened": "year_view_mode" })}>
        <YearViewMode state={state} send={send} />
      </When>
      <When condition={state.matches({ "calendar_body_opened": "month_view_mode" })}>
      <MonthViewMode state={state} send={send} />
      </When>
      <When condition={state.matches({ "calendar_body_opened": "day_view_mode" })}>
        <CalendarController state={state} send={send} />

        {/* MONTH YEAR PANEL */}
        <Box w="full" sx={{
          p: '6px',
          bg: "#EEEFF1",
          color: "#2C2D2C",
          textAlign: 'center',
          my: '5px'
        }}>
          {`${nepaliMonthMap[state.context.panel_month]} ${state.context.panel_year}`}
        </Box>

        <Table>
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
                              const { primaryYear, primaryMonth, primaryDay } = dayInfo;
                              send("on_day_selection", {
                                data: {
                                  date: `${primaryYear}-${zero_pad(primaryMonth)}-${zero_pad(primaryDay)}`
                                }
                              })
                            }}
                          >
                            <Flex gap={'3px'}>
                              <If condition={false}>
                                <Then>
                                  <Text fontSize={'14px'}>
                                    {englishToNepaliNumber(dayInfo.primaryDay)}
                                  </Text>
                                  <Text pt='1px' fontSize={'11px'}>
                                    {dayInfo.secondaryDay}
                                  </Text>
                                </Then>
                                <Else>
                                  <Text fontSize={'14px'}>{dayInfo.primaryDay}</Text>
                                  <Text pt='1px' fontSize={'11px'}>
                                    {englishToNepaliNumber(dayInfo.secondaryDay)}
                                  </Text>
                                </Else>
                              </If>
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
        <Today state={state} send={send} />
      </When>
    </Container>
  )
}


