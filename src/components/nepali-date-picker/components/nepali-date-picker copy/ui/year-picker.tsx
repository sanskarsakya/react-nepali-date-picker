import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { englishToNepaliNumber } from 'nepali-number';
import { If, Then, Else } from 'react-if';

interface YearPickerProps {
  handleYearViewMode: () => void;
  selectedvalue: any;
  nepaliWriting: boolean;
}

export const YearPicker = ({
  handleYearViewMode,
  selectedvalue,
  nepaliWriting
}: YearPickerProps) => {
  return (
    <Box>
      <Button
        variant='unstyled'
        onClick={handleYearViewMode}
        _hover={{ color: '#0875e1', bg: 'gray.100' }}
      >
        <If condition={nepaliWriting}>
          <Then>
            <Text p={2} fontSize='16px' fontWeight='600'>
              {englishToNepaliNumber(selectedvalue)}
            </Text>
          </Then>
          <Else>
            <Text p={2} fontSize='16px' fontWeight='600'>
              {selectedvalue}
            </Text>
          </Else>
        </If>
      </Button>
    </Box>
  );
};
