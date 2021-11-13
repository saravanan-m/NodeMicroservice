const yup = require('yup');
const { formatYupErrors } = require('../utils/YupErrorFormatter')

const accountRequestSchema = yup.object().shape({
    user_mapper_id: yup.string().required(),
    type: yup.string().required()
}).noUnknown();

const validateAccountInput = async (data) => {
    return accountRequestSchema
        .validate(data, { strict: true, abortEarly: false })
        .catch(error => Promise.reject(formatYupErrors(error)));
}