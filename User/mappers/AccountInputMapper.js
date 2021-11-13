const { AccountDto } = require('../dto/AccountDto')

/**
 * mapper id to accountDto
 * @param {String} userMapperId - mapper id
 * @returns {Promise<AccountDto>}
 */
const accountDtoMap = async (mapperId) => {
    return new AccountDto(mapperId, 'SAVINGS');
}


/**
 * Maps resposne json into accountdto
 * @param {JSON} account - The account json
 * @returns {Promise<AccountDto>}
 */
 const accountJsonToDtoMap = async (account) => {
    let accountDto = new AccountDto(undefined, account.type);
    accountDto.balance = account.balance
    return accountDto;
}

module.exports = {
    accountDtoMap,
    accountJsonToDtoMap
}