export const REQUIRED_VALIDATOR = (fieldName) => {
    return {
        required: true,
        message: `${fieldName} is required.`
    }
}

export const MAX_LENGTH_VALIDATOR = (fieldName, maxValue) => {
    return {
        max: maxValue,
        message: `${fieldName} has max value of length is ${maxValue}`
    }
}

export const MIN_LENGTH_VALIDATOR = (fieldName, minValue) => {
    return {
        min: minValue,
        message: `${fieldName} has min value of length is ${minValue}`
    }
}

export const CompanyProfileValidation = {
    name: [
        {
            required: true,
            message: 'This field is required'
        },
        {
            max : 100,
            message: 'This field has max length is 100 characters'
        }
    ],

}