const yup = require('yup');
const { formatYupErrors } = require('../utils/YupErrorFormatter')

const userRequestSchema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required()
}).noUnknown();

const validateUserInput = async (data) => {
    return userRequestSchema
        .validate(data, { strict: true, abortEarly: false })
        .catch(error => Promise.reject(formatYupErrors(error)));
}

module.exports = {
    validateUserInput
}