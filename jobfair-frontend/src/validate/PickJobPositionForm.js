export const PickJobPositionFormValidation = {
    jobTitle: [{required: true, message: 'Missing title'}],
    description: [{required: true, message: 'Missing description'}],
    requirement: [{required: true, message: 'Missing requirement'}],
    minSalary: (name) => {
        return [{required: true, message: 'Missing min salary'},
            {pattern: /^\d+$/, message: 'Invalid number format'},
            ({getFieldValue}) => ({
            validator(_, value) {
                if (!value || getFieldValue('jobPositions')[name].maxSalary < value) {
                    return Promise.reject(new Error('Invalid min salary.'))
                }
                if (value <= 0) {
                    return Promise.reject(new Error('The minimum of salary is 1'))
                }
                if (value > 99999) {
                    return Promise.reject(new Error('The maximum of salary is 99999'))
                }

                return Promise.resolve()
            }
        }),
        ]
    },
    maxSalary: (name) => {
        return [
            {required: true, message: 'Missing max salary'},
            {pattern: /^\d+$/, message: 'Invalid number format'},
            ({getFieldValue}) => ({
                validator(_, value) {
                    if (!value || getFieldValue('jobPositions')[name].minSalary > value) {
                        return Promise.reject(new Error('Invalid max salary.'))
                    }
                    if (value <= 0) {
                        return Promise.reject(new Error('The minimum of salary is 1'))
                    }
                    if (value > 99999) {
                        return Promise.reject(new Error('The maximum of salary is 99999'))
                    }

                    return Promise.resolve()
                }
            }),
        ]
    },
    numberOfPosition: [{required: true, message: 'Missing number of position'},
        {pattern: /^\d+$/, message: 'Invalid number format'},
        () => ({
            validator(_, value) {
                if (!value || value >= 10000) {
                    return Promise.reject(new Error('The maximum of position is 10000'))
                }
                if (value <= 0) {
                    return Promise.reject(new Error('The minimum of position is 1'))
                }

                return Promise.resolve()
            }
        })]
}
