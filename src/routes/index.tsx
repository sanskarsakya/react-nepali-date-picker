import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RouteEnum } from './routeEnum';

// COMPONENTS
import DatePickerContainer from '../pages/date-picker';
import AppShell from '../components/app-shell';
import { ErrorPlaceholder } from '../components/ErrorPlaceholder/ErrorPlaceholder';
import { DatePickerXState } from '../pages/date-picker-xstate/components/ui';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppShell />,
        errorElement: <ErrorPlaceholder />,
        children: [
            {
                index: true,
                element: (
                    <Navigate
                        to={RouteEnum.DATE_PICKER}
                        replace
                    />
                ),
            },
            {
                path: RouteEnum.DATE_PICKER,
                element: <DatePickerContainer />,
                errorElement: <ErrorPlaceholder />,
            },
            {
                path: RouteEnum.DATE_PICKER_XSTATE,
                element: <DatePickerXState />,
                errorElement: <ErrorPlaceholder />,
            },
        ]
    },
]);
