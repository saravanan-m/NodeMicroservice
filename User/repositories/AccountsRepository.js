const axios = require('axios')
const { AccountDto } = require('../dto/AccountDto')

/**
 * @param {AccountDto} data - The account dto
 * @returns {Promise<AccountDto>} - response body
 */
const createAccountApi = async (data) => {
    return await axios.post('http://localhost:8082/account/create', data); //{ user_mapper_id: userMapperId }
}

/**
 * @param {String} userMapperId - mapper uuid
 * @returns {Promise<String>} - response body
 */
const getAccountApi = async (userMapperId) => {
    return await axios.get('http://localhost:8082/account/get/' + userMapperId)
}

module.exports = {
    createAccountApi,
    getAccountApi
}