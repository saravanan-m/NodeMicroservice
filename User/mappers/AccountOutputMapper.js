const errorResponse = async (msg) => {
    return {
        'code': '301', 'data': { 'msg': msg }
    }
}

const successResponse = async (data) => {
    return {
        'code': '200', 'data': data
    }
}

module.exports = {
    errorResponse,
    successResponse
}