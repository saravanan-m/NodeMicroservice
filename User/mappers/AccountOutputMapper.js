
/**
 * Error response presenter
 * @param {JSON} - Response json
 * @returns {JSON}
 */
const errorResponse = async (msg) => {
    return {
        'code': '301', 'data': { 'msg': msg }
    }
}

/**
 * Success response presenter
 * @param {JSON} - Response json
 * @returns {JSON}
 */
const successResponse = async (data) => {
    return {
        'code': '200', 'data': data
    }
}

module.exports = {
    errorResponse,
    successResponse
}