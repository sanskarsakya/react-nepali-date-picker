import {
  Box,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { Else, If, Then } from 'react-if';
import { useDatePicker } from '../date-picker/useDatePicker';

interface CustomInputProps extends Record<string, any> {
  onChange: (date: string) => void;
  value: string;
  _isValid: any;
  _calendarDate: any;
}

export const CustomInput = ({
  onChange,
  _isValid,
  value,
  onClick,
  ...rest
}: CustomInputProps) => {
  const [inputDate, setInputDate] = React.useState(value);


  React.useEffect(() => {
    setInputDate(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length > 10) {
      return;
    }

    const formattedValue = inputValue;
    setInputDate(formattedValue);

    onChange?.(formattedValue);
  };

  const handleClearInput = () => {
    setInputDate('');
    onChange?.('');
  };


  return (
    <Box maxW={175}>
      <InputGroup>
        <Input
          value={inputDate}
          onChange={handleInputChange}
          placeholder='yyyy-mm-dd'
          onClick={onClick}
          bg='white'
          w='full'
          height='38px'
          size='md'
          border='1px solid'
          borderRadius='4px'
          borderColor={_isValid?.length === 0 ? '#CDD5DF' : 'red'}
          _hover={{ borderColor: '#B6C3D3' }}
          _placeholder={{
            color: '#878787',
            fontWeight: '300',
            fontSize: '14px',
            textTransform: 'lowercase',
          }}
          {...rest}
        />
        <InputRightElement width='25px'>
          <Box
            cursor='pointer'
            width='full'
            height='full'
            display='flex'
            alignItems='center'
            justifyContent='center'
            onClick={() => {
              if (inputDate.length === 0) {
                onClick();
              } else {
                handleClearInput();
              }
            }}
          >
            <If condition={inputDate.length === 0}>
              <Then>
                <BiCalendar size='16px' color='gray' />
              </Then>
              <Else>
                <RxCross2 size='16px' color='gray' />
              </Else>
            </If>
          </Box>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export const CustomInputWithRefForwarded = React.forwardRef(
  (props: any, ref) => {

    return <CustomInput ref={ref} {...props} />;
  },
);


export const DateInputV2 = () => {
  const {
    _calendarDate,
    disableDateBefore,
    disableDateAfter,
    _date,
    _isValid,
    nepaliDatePickerInput,
    toggleCalendar,
    onInputChangeHandler,
  } = useDatePicker();

  return (
    <CustomInputWithRefForwarded
      ref={nepaliDatePickerInput}
      value={_date}
      onChange={onInputChangeHandler}
      onClick={toggleCalendar}
      _isValid={_isValid}
      _calendarDate={_calendarDate}
      disableDateBefore={disableDateBefore}
      disableDateAfter={disableDateAfter}
    />
  );
};
