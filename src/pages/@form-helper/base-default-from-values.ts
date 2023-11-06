export const getDefaultRules = ({ required }: { required?: boolean }) => ({
    required: {
        value: required,
        message: 'Required',
    },
});
