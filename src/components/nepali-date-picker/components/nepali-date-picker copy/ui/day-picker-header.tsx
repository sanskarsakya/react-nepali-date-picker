import { Thead, Tr, Td } from '@chakra-ui/react';
import { get_styles } from '../style';
import { useDatePicker } from '../date-picker/useDatePicker';
import * as fromCalendarEngine from '../calendar-engine';

export const DayPickerHeader = () => {

  const {
    is_dark,
  } = useDatePicker();


  const Styles = get_styles(is_dark);

  return (
    <Thead>
      <Tr sx={Styles.header}>
        {fromCalendarEngine.weeks['en'].map(
          (weekDay: string, index: number) => (
            <Td p={2} key={index}>
              {weekDay}
            </Td>
          ),
        )}
      </Tr>
    </Thead>
  );
};