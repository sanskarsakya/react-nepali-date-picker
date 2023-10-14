import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

interface MonthPickerProps {
  handleMonthViewMode: () => void;
  selectedvalue: any;
}

export const MonthPicker = ({
  handleMonthViewMode,
  selectedvalue,
}: MonthPickerProps) => {
  
  return (
    <Box>
      <Button
        variant='unstyled'
        onClick={handleMonthViewMode}
        _hover={{ color: '#0875e1', bg: 'gray.100' }}
      >
        <Text p={2} fontSize='16px' fontWeight='600'>
          {selectedvalue}
        </Text>
      </Button>
    </Box>
  );
};
