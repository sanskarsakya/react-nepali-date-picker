// UI
import { ChakraProvider } from '@chakra-ui/react';

// STORE

// THEME
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes';
import { AppTheme } from '../theme';

const AppProviders = () => {
  return (
      <ChakraProvider theme={AppTheme}>
        <RouterProvider router={router} />
      </ChakraProvider>
  );
};

export default AppProviders;
