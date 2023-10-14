import React from 'react';
import { Box, Input, useMergeRefs } from '@chakra-ui/react';

export const countHyphens = (inputString: any) => {
  if (typeof inputString !== 'string') {
    throw new Error('Input must be a string');
  }
  let count = 0;
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === '-') {
      count++;
    }
  }
  return count;
};
/**
 * @param current_caret_position
 * @param current_value
 */
export const derive_new_value = (
  current_caret_position: any,
  current_value: any,
) => {
  let new_caret_position = 0;
  let new_value = '';
  if (current_caret_position <= 4) {
    new_caret_position = current_caret_position - 1;
    current_value = current_value.replace(/-/g, '');
    const before = current_value.slice(0, current_caret_position - 1);
    const after = current_value.slice(current_caret_position);
    current_value = before + after;
    for (let i = 0; i < current_value.length; i++) {
      if (i === 4 || i === 6 || i === 8) {
        new_value += '-' + current_value[i];
      } else {
        new_value += current_value[i];
      }
    }
  }
  if (current_caret_position === 6) {
    new_caret_position = current_caret_position - 1;
    current_value = current_value.replace(/-/g, '');
    const before = current_value.slice(0, current_caret_position - 2);
    const after = current_value.slice(current_caret_position - 1);
    current_value = before + after;
    for (let i = 0; i < current_value.length; i++) {
      if (i === 4 || i === 6 || i === 8) {
        new_value += '-' + current_value[i];
      } else {
        new_value += current_value[i];
      }
    }
  }
  if (current_caret_position === 7) {
    new_caret_position = current_caret_position - 1;
    current_value = current_value.replace(/-/g, '');
    const before = current_value.slice(0, current_caret_position - 2);
    const after = current_value.slice(current_caret_position - 1);
    current_value = before + after;
    for (let i = 0; i < current_value.length; i++) {
      if (i === 4 || i === 6 || i === 8) {
        new_value += '-' + current_value[i];
      } else {
        new_value += current_value[i];
      }
    }
  }
  if (current_caret_position === 9) {
    new_caret_position = current_caret_position - 1;
    current_value = current_value.replace(/-/g, '');
    const before = current_value.slice(0, current_caret_position - 3);
    const after = current_value.slice(current_caret_position - 2);
    current_value = before + after;
    for (let i = 0; i < current_value.length; i++) {
      if (i === 4 || i === 6 || i === 8) {
        new_value += '-' + current_value[i];
      } else {
        new_value += current_value[i];
      }
    }
  }
  if (current_caret_position === 10) {
    new_caret_position = current_caret_position - 1;
    current_value = current_value.replace(/-/g, '');
    const before = current_value.slice(0, current_caret_position - 3);
    const after = current_value.slice(current_caret_position + 2);
    current_value = before + after;
    for (let i = 0; i < current_value.length; i++) {
      if (i === 4 || i === 6 || i === 8) {
        new_value += '-' + current_value[i];
      } else {
        new_value += current_value[i];
      }
    }
  }
  return {
    caret_position: new_caret_position,
    new_value: new_value,
  };
};
interface CustomInputProps extends Record<string, any> {
  onChange: (date: string) => void;
  value: string;
  _isValid: any;
  _calendarDate: any;
  ref: any;
}

export const CustomInput = ({
  onChange,
  value,
  _isValid,
  _calendarDate,
  ref,
  ...rest
}: CustomInputProps) => {
  const internalRef = React.useRef<any>(null);

  // LOCAL STATE
  const [_value, _setValue] = React.useState(value);
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const [_isHyphenAdded, _setIsHyphenAdded] = React.useState(false);
  const refs = useMergeRefs(internalRef, ref);

  React.useEffect(() => {
    _setValue(value);
  }, [value]);

  React.useEffect(() => {
    if (internalRef.current) {
      internalRef.current?.setSelectionRange(start, end);
      // console.log({
      //   start: internalRef.current.selectionStart,
      //   end: internalRef.current.selectionEnd
      // });
    }
  });

  const formatInputDate = (inputValue: any) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const year = numericValue.slice(0, 4);
    const month = numericValue.slice(4, 6);
    const day = numericValue.slice(6, 8);
    let formattedValue = '';
    if (year) {
      formattedValue += year;
    }
    if (month) {
      formattedValue += '-' + month;
    }
    if (day) {
      formattedValue += '-' + day;
    }
    return formattedValue;
  };

  const handleValidation = (_value: string) => {
    const dateFormat = /^(\d{4})-?(\d{0,2})?-?(\d{0,2})?$/;
    return dateFormat.test(_value);
  };

  const handleChange = (e: any) => {
    if (internalRef.current) {
      const { selectionStart, selectionEnd } = internalRef.current;
      console.log({ selectionStart, selectionEnd });
      const new_val = formatInputDate(e.target.value);
      const old_val = _value;
      const is_removing = new_val.length < old_val.length;
      const number_of_hypens = countHyphens(new_val);
      if (number_of_hypens > 0) {
        _setIsHyphenAdded(true);
      }
      if (is_removing) {
        _setIsHyphenAdded(true);
        const { caret_position, new_value } = derive_new_value(
          selectionStart + 1,
          _value,
        );
        setStart(caret_position);
        setEnd(caret_position);
        _setValue(new_value);
        let isValid = handleValidation(new_value);
        if (isValid) {
          onChange?.(new_value);
        }
      } else {
        _setIsHyphenAdded(false);
        if (_isHyphenAdded) {
          setStart(selectionStart);
          setEnd(selectionEnd);
          _setValue(new_val);
          let isValid = handleValidation(new_val);
          if (isValid) {
            onChange?.(new_val);
          }
        } else {
          const { selectionStart, selectionEnd } = internalRef.current;
          const number_of_hypens = countHyphens(new_val);
          setStart(selectionStart + number_of_hypens);
          setEnd(selectionEnd + number_of_hypens);
          _setValue(new_val);
          let isValid = handleValidation(new_val);
          if (isValid) {
            onChange?.(new_val);
          }
        }
      }
    }
  };

  return (
    <Box maxW={80}>
      <Input
        ref={refs}
        value={_value}
        onChange={handleChange}
        // onClick={() => {
        //   setStart(_value?.length)
        //   setEnd(_value?.length)
        // }}
        onKeyDown={(e: any) => {
          console.log({
            s: e.selectionStart,
            e: e.selectionEnd,
          });
          // console.log(e.keyCode);
          // if (e.keyCode === 8 || e.keyCode === 46) {
          //   console.log("delete");
          //   _setValue("");
          // }
        }}
        placeholder='YYYY-MM-DD'
        border='none'
        borderRadius='0px'
        {...rest}
      />
    </Box>
  );
};

export const CustomInputWithRefForwarded = React.forwardRef(
  (props: any, ref) => {
    return <CustomInput ref={ref} {...props} />;
  },
);

interface DateInputProps {
  nepaliDatePickerInput: any;
  _date: any;
  toggleCalendar: any;
  onInputChangeHandler: any;
  _isValid: any;
  _calendarDate: any;
}

export const DateInput = ({
  nepaliDatePickerInput,
  _date,
  toggleCalendar,
  onInputChangeHandler,
  _isValid,
  _calendarDate,
}: DateInputProps) => {
  return (
    <CustomInputWithRefForwarded
      ref={nepaliDatePickerInput}
      value={_date}
      onChange={onInputChangeHandler}
      onClick={toggleCalendar}
      _isValid={_isValid}
      _calendarDate={_calendarDate}
    />
  );
};
