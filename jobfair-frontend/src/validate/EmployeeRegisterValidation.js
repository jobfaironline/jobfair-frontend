export const EmployeeRegisterValidation = {
    email : [
        {
            type: 'email',
            message: 'The input is not valid E-mail!',
        },
        {
            required: true,
            message: 'Please input your E-mail!',
        },
    ],
    password : [
        {
            required: true,
            message: 'Please input your password!',
        },
    ],
    confirm: [
        {
            required: true,
            message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
        }),
    ],
    firstName: [
        {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
        },
    ],
    middleName: [
    ],
    lastName: [
        {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
        },
    ],
    phone : [
        {
            required: true,
            message: 'Please input your phone number!',
        },
    ],
    gender: [
        {
            required: true,
            message: 'Please select gender!',
        },
    ]
}